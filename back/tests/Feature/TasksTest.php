<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;
use App\Models\User;
use App\Models\Task;

class TasksTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private User $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create(['role' => 'admin']);
        $this->user = User::factory()->create(['role' => 'user']);
    }

    public function test_admin_can_see_all_tasks(): void
    {
        $task = Task::factory()->create();

        Sanctum::actingAs($this->admin);

        $response = $this->getJson('/api/tasks');

        $response->assertStatus(200);
        $response->assertJsonFragment(['title' => $task->title]);
    }

    public function test_user_cannot_see_all_tasks(): void
    {
        $task = Task::factory()->create();

        Sanctum::actingAs($this->user);

        $response = $this->getJson('/api/tasks');

        $response->assertStatus(200);
        $response->assertJsonMissing(['title' => $task->title]);
    }

    public function test_user_can_see_own_tasks(): void
    {
        $task = Task::factory()->create(['user_id' => $this->user->id]);

        Sanctum::actingAs($this->user);

        $response = $this->getJson('/api/tasks');

        $response->assertStatus(200);
        $response->assertJsonFragment(['title' => $task->title]);
    }

    public function test_tasks_pagination_works(): void
    {
        Task::factory()->count(6)->create(['user_id' => $this->user->id]);

        Sanctum::actingAs($this->user);

        $response = $this->getJson('/api/tasks?page=1');

        $response->assertStatus(200);
        $response->assertJsonCount(5, 'tasks.data');
    }

    public function test_search_functionality(): void
    {
        Task::factory()->create(['title' => 'Test Task', 'user_id' => $this->user->id]);

        Sanctum::actingAs($this->user);

        $response = $this->getJson('/api/tasks?search=Test');

        $response->assertStatus(200);
        $response->assertJsonFragment(['title' => 'Test Task']);
    }

    public function test_status_filter_functionality(): void
    {
        Task::factory()->create(['status' => 'done', 'user_id' => $this->user->id]);

        Sanctum::actingAs($this->user);

        $response = $this->getJson('/api/tasks?status=done');

        $response->assertStatus(200);
        $this->assertDatabaseHas('tasks', ['status' => 'done', 'user_id' => $this->user->id]);
    }

    public function test_admin_can_create_task(): void
    {
        $taskData = [
            'title' => 'New Task',
            'description' => 'Task description',
            'status' => 'in_progress',
            'user_id' => $this->user->id
        ];

        Sanctum::actingAs($this->admin);

        $response = $this->postJson('/api/tasks', $taskData);

        $response->assertStatus(201);
        $this->assertDatabaseHas('tasks', $taskData);
    }

    public function test_admin_create_task_validation_throws_error(): void
    {
        $taskData = [
            'title' => 'New Task',
            'user_id' => 999 // user does not exist
        ];

        Sanctum::actingAs($this->admin);

        $response = $this->postJson('/api/tasks', $taskData);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['description', 'user_id']);
    }

    public function test_user_cannot_create_task(): void
    {
        $taskData = [
            'title' => 'New Task',
            'description' => 'Task description',
            'status' => 'in_progress',
            'user_id' => $this->user->id
        ];

        Sanctum::actingAs($this->user);

        $response = $this->postJson('/api/tasks', $taskData);

        $response->assertStatus(403);
        $response->assertJson(['message' => 'Forbidden']);
    }

    public function test_admin_update_task_validation_throws_error(): void
    {
        $task = Task::factory()->create();

        Sanctum::actingAs($this->admin);

        $response = $this->putJson("/api/tasks/{$task->id}", [
            'user_id' => null // user_id is not provided
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['user_id']);
    }

    public function test_admin_can_update_task(): void
    {
        $task = Task::factory()->create(['status' => 'in_progress', 'user_id' => $this->user->id]);

        Sanctum::actingAs($this->admin);

        $updatedData = [
            'title' => 'Updated Task Title',
            'description' => 'Updated Task Description',
            'user_id' => $this->user->id,
            'status' => 'done'
        ];

        $response = $this->putJson("/api/tasks/{$task->id}", $updatedData);

        $response->assertStatus(200);
        $this->assertDatabaseHas('tasks', $updatedData);
    }

    public function test_user_cannot_update_other_users_task(): void
    {
        $task = Task::factory()->create();


        Sanctum::actingAs($this->user);

        $response = $this->putJson("/api/tasks/{$task->id}", [
            'title' => 'Updated Task Title',
            'description' => 'Updated Task Description',
            'status' => 'done'
        ]);

        $response->assertStatus(403);
        $response->assertJson(['message' => 'Forbidden']);
    }

    public function test_user_can_update_his_own_task(): void
    {
        $task = Task::factory()->create(['user_id' => $this->user->id]);

        Sanctum::actingAs($this->user);

        $updatedData = [
            'title' => 'Updated Task Title',
            'description' => 'Updated Task Description',
            'status' => 'done'
        ];

        $response = $this->putJson("/api/tasks/{$task->id}", $updatedData);

        $response->assertStatus(200);
        $this->assertDatabaseHas('tasks', array_merge(['id' => $task->id], $updatedData));
    }

    public function test_admin_can_delete_task(): void
    {
        $task = Task::factory()->create();

        Sanctum::actingAs($this->admin);

        $response = $this->deleteJson("/api/tasks/{$task->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    public function test_user_cannot_delete_other_users_task(): void
    {
        $task = Task::factory()->create();

        Sanctum::actingAs($this->user);

        $response = $this->deleteJson("/api/tasks/{$task->id}");

        $response->assertStatus(403);
        $response->assertJson(['message' => 'Forbidden']);
    }
}
