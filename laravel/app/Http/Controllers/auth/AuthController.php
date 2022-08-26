<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use Auth;
use Hash;
use App\Models\User;
use Validator;
use Illuminate\Support\Str;
use App\Mail\TripMail;
use Mail;
use DB;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            if (Auth::attempt($request->only('email','password'))) {
                $user = Auth::user();
                $token = $user->createToken('app')->accessToken;
                return response([
                    'message' => 'Successfully Login',
                    'token' => $token,
                    'user' => $user,
                ],200);
            }
            
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage()
            ],400);
        }

        return response([
            'message' => 'Invalid Email Or Password'
        ],400);
    } // End login Method


    public function register(RegisterRequest $request)
    {
        try {

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            $token = $user->createToken('app')->accessToken;

            return response([
                'message' => 'Registration Successfull',
                'token' => $token,
                'user' => $user,
            ],200);
            
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage()
            ],400);
        }

    } // End login Method


    public function forget(Request $request)
    {
        try {

            $input = $request->only(['email']);
            $request_data = [
                'email' => 'required|email|exists:users,email',
            ];

            $validator = Validator::make($input, $request_data);

            if ($validator->fails()) {
                $errors = json_decode(json_encode($validator->errors()), 1);
                return response()->json([
                    'status' => 400,
                    'message' => array_reduce($errors, 'array_merge', array()),
                ],400);
            } else {
                $token = Str::random(32);
                DB::table('password_resets')->insert([
                    'email' => $request->email,
                    'token' => $token,
                ]);

                Mail::to($request->email)->send(new TripMail($token));


                return response()->json([
                    'status' => 200,
                    'message' => 'Mail Successfully Sent'
                ]);
            }

            
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage()
            ],400);
        }

    } // End forget Method


    public function reset_password(Request $request)
    {
        try {

            $input = $request->all();
            $request_data = [
                'email' => 'required|email|exists:users,email|exists:password_resets,email',
                'token' => 'required|exists:password_resets,token',
                'password' => 'required|confirmed',
            ];

            $validator = Validator::make($input, $request_data);

            if ($validator->fails()) {
                $errors = json_decode(json_encode($validator->errors()), 1);
                return response()->json([
                    'status' => 400,
                    'message' => array_reduce($errors, 'array_merge', array()),
                ],400);
            } else {
                User::where('email',$request->email)->update([
                    'password' => Hash::make($request->password)
                ]);
                DB::table('password_resets')->where('email',$request->email)->delete();


                return response()->json([
                    'status' => 200,
                    'message' => 'Password Successfully Updated'
                ]);
            }

            
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage()
            ],400);
        }

    } // End reset_password Method


    public function get_user_data(Request $request)
    {
        return Auth::user();

    } // End get_user_data Method
}
