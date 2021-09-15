'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/signup', 'AuthUserController.register');
Route.post('/login', 'AuthUserController.authenticate');


Route.group(() => {
    Route.get('/car/index', 'CarController.index')
    Route.post('/car/store', 'CarController.store')
    Route.get('/car/show/:id', 'CarController.show')
    Route.put('/car/update/:id', 'CarController.update')
    Route.delete('/car/delete/:id', 'CarController.destroy')
}).middleware(['auth']);


Route.group(() => {
    Route.get('/customer/index', 'CustomerController.index')
    Route.post('/customer/store', 'CustomerController.store')
    Route.get('/customer/show/:id', 'SaleController.show')
    Route.put('/customer/update/:id', 'CustomerController.update')
    Route.delete('/customer/delete/:id', 'CustomerController.destroy')
}).middleware(['auth']);

Route.put('/sale/store', 'SaleController.store').middleware(['auth']);