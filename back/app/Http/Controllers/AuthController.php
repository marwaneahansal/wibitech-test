<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthLoginRequest;
use App\Http\Requests\AuthRegisterRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(AuthRegisterRequest $request)
    {
        $request_data = $request->validated();

        User::create([
            'username' => $request_data['username'],
            'first_name' => $request_data['first_name'],
            'last_name' => $request_data['last_name'],
            'password' => Hash::make($request_data['password']),
            'role' => 'user'
        ]);

        return response()->json(['message' => 'User Created Successfully'], 201);
    }

    public function login(AuthLoginRequest $request)
    {
        $request_data = $request->validated();

        $user = User::where('username', $request_data['username'])->first();

        if (!$user) {
            return response()->json(['message' => 'Invalid credentials'], 404);
        }

        $is_password_valid = Hash::check($request_data['password'], $user->password);

        if (!$is_password_valid) {
            return response()->json(['message' => 'Invalid credentials'], 404);
        }

        $token = $user->createToken('access_token')->plainTextToken;


        return response()->json(['message' => 'Login successful', 'access_token' => $token, 'user' => $user]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout successful']);
    }
}
