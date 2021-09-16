<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
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

Route::post('auth/login', [AuthController::class, 'login']);


Route::group([
    'middleware' => ['jwt.verify'],
    'prefix' => 'v1'
], function () {
    Route::resource('users', UserController::class);
   Route::resource('products', ProductController::class);
   Route::resource('sales', SaleController::class);
   Route::resource('clients', ClientController::class);

});


