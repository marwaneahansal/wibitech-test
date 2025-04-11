<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'username' => 'required|unique:users,username',
            'first_name' => 'required',
            'last_name' => 'required',
            'password' => 'required|min:6'
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
        $user = User::create([
            'username' => $request_data['username'],
            'first_name' => $request_data['first_name'],
            'last_name' => $request_data['last_name'],
            'password' => Hash::make($request_data['password']),
            'role' => 'user'
        ]);

        return response()->json(['message' => 'User Created Successfully'], 201);
    }

    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required'
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
        $user = User::where('username', $request_data['username'])->first();

        if (!$user) {
            return response()->json(['message', 'Invalid credentials']);
        }

        $is_password_valid = Hash::check($request_data['password'], $user->password);

        if (!$is_password_valid) {
            return response()->json(['message', 'Invalid credentials']);
        }

        $token = $user->createToken('access_token')->plainTextToken;


        return response()->json(['access_token' => $token, 'user' => $user]);
    }
}
