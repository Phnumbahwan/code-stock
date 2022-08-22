<?php
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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



// Public Routes
Route::post('/login', [UserController::class, 'login']); // Login User
Route::post('/register', [UserController::class, 'register']); // Register User



// This are Protected Routes
Route::group(['middleware'=>['auth:sanctum']],function(){
    Route::get('/users', [UserController::class, 'index']); // Show Users
    Route::get('/users/search/{name}', [UserController::class, 'search']); // Search User

    Route::get('/products', [ProductController::class, 'index']); // Show Products
    Route::get('/products/{id}',[ProductController::class, 'show']); //Show Specific Product
    Route::get('/products/search/{name}', [ProductController::class, 'search']); // Search Product

    
    Route::post('/products', [ProductController::class, 'store']); // Create Product
    Route::put('/products/{id}', [ProductController::class, 'update']); // Update Product
    Route::delete('/products/{id}', [ProductController::class, 'destroy']); // Delete Product

    Route::post('/logout', [UserController::class, 'logout']); // User logged out
});






Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
