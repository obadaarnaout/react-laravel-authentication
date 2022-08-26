<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\auth\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Login Route
Route::post('/login',[AuthController::class,'login']);

// Register Route
Route::post('/register',[AuthController::class,'register']);

// Forget Password Route
Route::post('/forget',[AuthController::class,'forget']);

// Rest Password Route
Route::post('/reset_password',[AuthController::class,'reset_password']);

// Get User Data Route
Route::get('/get_user_data',[AuthController::class,'get_user_data'])->middleware('auth:api');


