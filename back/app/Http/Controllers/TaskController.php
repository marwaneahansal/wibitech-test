<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Http\Request;
use App\Models\Task;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $query = Task::query();

        if ($user->role !== 'admin') {
            $query->where('user_id', $user->id);
        }

        $progressQuery = clone $query;
        $tasksInProgressCount = $progressQuery->where('status', 'in_progress')->count();

        if ($request->has("search") && !empty($request->search)) {
            $searchQuery = $request->search;
            $query->where(function ($q) use ($searchQuery) {
                $q->where('title', 'LiKE', "%{$searchQuery}%");
            });
        }

        if ($request->has("status") && !empty($request->status) && $request->status != 'all') {
            $statusQuery = $request->status;
            $query->where(function ($q) use ($statusQuery) {
                $q->where('status', $statusQuery);
            });
        }

        $response['tasks'] = $query->with('user:id,username')->latest()->paginate(5);
        $response['tasks_in_progress_count'] = $tasksInProgressCount;

        return response()->json($response);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $request_data = $request->validated();

        $task = Task::create([
            'title' => $request_data['title'],
            'description' => $request_data['description'],
            'user_id' => $request_data['user_id'],
        ]);

        return response()->json(['message' => 'Task Created Successfully', 'task' => $task], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $user = $request->user();

        $task = Task::findOrFail($id);

        if ($user->role !== 'admin' && $user->id !== $task->user_id) {
            return response()->json(['message' => 'You\'re not allowed to view this task'], 403);
        }

        return response()->json(['task' => $task]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, string $id)
    {
        $user = $request->user();

        $task = Task::findOrFail($id);

        if ($user->role !== 'admin' && $user->id !== $task->user_id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $request_data = $request->validated();

        $task->title = $request_data['title'] ?? $task->title;
        $task->description = $request_data['description'] ?? $task->description;
        $task->status = $request_data['status'] ?? $task->status;

        // allow only the admin to update the user_id
        if ($user->role === 'admin') {
            $task->user_id = $request_data['user_id'] ?? $task->user_id;
        }

        $task->save();

        return response()->json(['message' => 'Task updated successfully', 'task' => $task]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::findOrFail($id);

        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }
}
