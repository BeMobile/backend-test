<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\VendaController;
use App\Http\Controllers\EnderecoController;
use App\Http\Controllers\TelefoneController;

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

Route::prefix('v1')->group(function () {
    //Authenticate
    Route::post('login', [AuthController::class, 'login']);
});

Route::prefix('v1')->middleware('jwt.auth')->group(function () {
    //Auth
    Route::post('me', [AuthController::class, 'me']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('logout', [AuthController::class, 'logout']);

    //Users    
    Route::post('users/signup', [UserController::class, 'signup']);

    //Clientes
    Route::get('clientes', [ClienteController::class, 'index']);
    Route::get('clientes/{id}', [ClienteController::class, 'show']);
    Route::post('clientes/store', [ClienteController::class, 'store']);
    Route::put('clientes/update/{id}', [ClienteController::class, 'update']);
    Route::delete('clientes/delete/{id}', [ClienteController::class, 'delete']);

    //Telefones
    Route::post('telefones/store', [TelefoneController::class, 'store']);
    Route::put('telefones/update/{id}', [TelefoneController::class, 'update']);
    Route::delete('telefones/delete/{id}', [TelefoneController::class, 'delete']);

    //Endereços
    Route::post('enderecos/store', [EnderecoController::class, 'store']);
    Route::put('enderecos/update/{id}', [EnderecoController::class, 'update']);
    Route::delete('enderecos/delete/{id}', [EnderecoController::class, 'delete']);

    //Produtos
    Route::get('produtos', [ProdutoController::class, 'index']);
    Route::get('produtos/{id}', [ProdutoController::class, 'show']);
    Route::post('produtos/store', [ProdutoController::class, 'store']);
    Route::put('produtos/update/{id}', [ProdutoController::class, 'update']);
    Route::delete('produtos/delete/{id}', [ProdutoController::class, 'delete']);

    //Vendas 
    Route::post('vendas/store', [VendaController::class, 'store']);
});
