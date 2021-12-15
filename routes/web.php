<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $helloWord = "Hello Word";

    return view('welcome', compact('helloWord'));
});

Route::group(['middleware' => ['auth']], function(){

    Route::prefix('admin')->name('admin.')->namespace('Admin')->group(function(){

        //Route::prefix('clients')->name('clients.')->group(function(){
    
            //Route::get('/', 'ClientController@index')->name('index');
            //Route::get('/create', 'ClientController@create')->name('create');
            //Route::post('/store', 'ClientController@store')->name('store');
            //Route::get('/show/{client}', 'ClientController@store')->name('show');
            //Route::get('/{client}/edit', 'ClientController@edit')->name('edit');
            //Route::post('/update/{client}', 'ClientController@update')->name('update');
            //Route::get('/destroy/{client}', 'ClientController@destroy')->name('destroy');
    
        //});
    
        Route::resource('clients', 'ClientController');
        Route::resource('products', 'ProductController');
        Route::resource('sales', 'SaleController');
        
    });
    
});






Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
