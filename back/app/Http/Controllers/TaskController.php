<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Validator;


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

        $tasks = $query->get();

        return response()->json(['tasks' => $tasks]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required',
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            $messages = [];
            foreach ($validator->errors()->getMessages() as $item) {
                array_push($messages, $item);
            }
            return response()->json(
                [
                    'errors' => [
                        'messages' => $messages,
                    ]
                ],
                422
            );
        }

        $request_data = $request->all();

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
    public function update(Request $request, string $id)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes',
            'description' => 'sometimes',
            'status' => 'sometimes|in:in_progress,done',
            'user_id' => 'sometimes|exists:users,id'
        ]);

        if ($validator->fails()) {
            $messages = [];
            foreach ($validator->errors()->getMessages() as $item) {
                array_push($messages, $item);
            }
            return response()->json(
                [
                    'errors' => [
                        'messages' => $messages,
                    ]
                ],
                422
            );
        }

        $task = Task::findOrFail($id);

        if ($user->role !== 'admin' && $user->id !== $task->user_id) {
            return response()->json(['message' => 'You\re not allowed to update this task', 403]);
        }

        $request_data = $request->all();

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
