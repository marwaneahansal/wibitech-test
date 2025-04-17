<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_auth_register_validation_throws_error(): void
    {
        $response = $this->postJson("/api/auth/register", [
            "username" => "username",
            "first_name" => "first Name",
            "last_name" => "last_name",
            "password" => "",
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['password']);
    }

    public function test_auth_register_successful(): void
    {
        $response = $this->postJson("/api/auth/register", [
            "username" => "username",
            "first_name" => "first_name",
            "last_name" => "last_name",
            "password" => "password",
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure(['message']);
    }

    public function test_auth_login_validation_throws_error(): void
    {
        $response = $this->postJson("/api/auth/login", [
            "username" => "username",
            "password" => "",
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['password']);
    }

    public function test_auth_login_user_does_not_exist(): void
    {
        $response = $this->postJson("/api/auth/login", [
            "username" => "non_existent_user",
            "password" => "password",
        ]);

        $response->assertStatus(404);
        $response->assertJson(['message' => 'Invalid credentials']);
    }

    public function test_auth_user_successful(): void
    {
        $user = User::factory()->create([
            'username' => 'username',
            'password' => bcrypt('password'),
        ]);

        $response = $this->postJson("/api/auth/login", [
            "username" => $user->username,
            "password" => "password",
        ]);

        $response->assertStatus(200);
        $this->assertArrayHasKey('access_token', $response->json());
        $this->assertArrayHasKey('user', $response->json());
        $this->assertEquals($user->username, $response->json('user.username'));
        $this->assertDatabaseHas('users', ['username' => $user->username]);
    }

    public function test_auth_logout_user_unauthenticated(): void
    {
        $response = $this->postJson("/api/auth/logout");

        $response->assertStatus(401);
        $response->assertJson(['message' => 'Unauthenticated.']);
    }

    public function test_auth_logout_user_successful(): void
    {
        $user = User::factory()->create([
            'username' => 'username',
            'password' => bcrypt('password'),
        ]);

        Sanctum::actingAs($user);

        $response = $this->postJson("/api/auth/logout");

        $response->assertStatus(200);
        $response->assertJson(['message' => 'Logout successful']);
    }
}
