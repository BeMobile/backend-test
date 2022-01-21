<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\VendaController;

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


Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup',[UsuarioController::class, 'store']);

Route::group(['middleware' => ['apiJwt']], function(){

    Route::get('/usuarios',[UsuarioController::class, 'index']);

    /*
    | Todas rotas abaixo estão em resource, exemplo:
    GET           /clientes                      index
    GET           /clientes/create               create
    POST          /clientes                      store
    GET           /clientes/{cliente}            show
    GET           /clientes/{cliente}/edit       edit
    PUT|PATCH     /clientes/{cliente}            update
    DELETE        /clientes/{cliente}            destroy
    */

    Route::resource('/clientes', ClienteController::class);
    Route::resource('/produtos', ProdutoController::class);
    Route::resource('/vendas', VendaController::class);

});

