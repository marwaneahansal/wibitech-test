<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/test', function () {
        return response()->json(['message' => 'Json Response']);
    });
});

Route::prefix('tasks')->middleware('auth:sanctum')->group(function () {
    Route::get('', [TaskController::class, 'index']);
    Route::middleware('role:admin')->post('', [TaskController::class, 'store']);
    Route::get('{id}', [TaskController::class, 'show']);
    Route::put('{id}', [TaskController::class, 'update']);
    Route::middleware('role:admin')->delete('{id}', [TaskController::class, 'destroy']);
});

Route::prefix('users')->middleware('auth:sanctum')->group(function () {
    Route::middleware('role:admin')->get('', [UserController::class, 'index']);
});

// Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
//     Route::get('/admin-only', function () {
//         return response()->json(['message' => 'This is only accessible by admin']);
//     });
// });

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
