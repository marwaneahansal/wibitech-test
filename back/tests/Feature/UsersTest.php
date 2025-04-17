<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UsersTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_user_cannot_see_list_of_users(): void
    {
        $response = $this->getJson('/api/users');

        $response->assertStatus(401);
        $response->assertJson(['message' => 'Unauthenticated.']);
    }

    public function test_regular_user_cannot_see_list_of_users(): void
    {
        $user = User::factory()->create(['role' => 'user']);

        Sanctum::actingAs($user);
        $response = $this->getJson('/api/users');

        $response->assertStatus(403);
        $response->assertJson(['message' => 'Forbidden']);
    }

    public function test_admin_user_can_see_list_of_users(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $user = User::factory()->create(['role' => 'user']);

        Sanctum::actingAs($admin);
        $response = $this->getJson('/api/users');

        $response->assertStatus(200);
        $response->assertJsonFragment(['username' => $user->username]);
        $response->assertJsonCount(1);
    }
}
