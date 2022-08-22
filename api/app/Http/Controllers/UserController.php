<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        // if(auth()->user()->role == '1') {
        //     return User::all();
        // }else {
        //     return [
        //         'message' => 'You need to be admin to enable action.'
        //     ];
        // }
        return User::all();
    }

    public function register(Request $request) {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function login(Request $request) {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check email
        $user = User::where('email', $fields['email'])->first();

        // Check password
        if(!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Invalid input'
            ], 401);
        }

        if($user) {
            $user->is_active = 1;
            $user->save();
        }

        $token = $user->createToken('myapptoken')->plainTextToken;
        // $token = $user->createAuthToken('myapptoken',20)->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function logout(Request $request) {
        $user = auth()->user();
        if($user) {
            $user->is_active = 0;
            $user->save();
        }
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged Out'
        ];
    }

    public function search($name)
    {
        return User::where('name', 'like','%'.$name.'%')->get();
    }
}
