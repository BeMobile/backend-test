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


Route.post("/register", "AuthController.register");

Route.post("/authenticate", "AuthController.authenticate");


Route.get('/clientes','ClienteController.index').middleware('auth')
Route.get('/clientes/:id','ClienteController.show').middleware('auth')
Route.post('/clientes','ClienteController.store').middleware('auth')
Route.patch('/clientes/:id','ClienteController.update').middleware('auth')
Route.delete('/clientes/:id','ClienteController.destroy').middleware('auth')

Route.get('/produtos','ProdutoController.index').middleware('auth')
Route.get('produtos/:id','ProdutoController.show').middleware('auth')
Route.post('produtos','ProdutoController.store').middleware('auth')
Route.patch('produtos/:id','ProdutoController.update').middleware('auth')
Route.delete('produtos/:id','ProdutoController.destroy').middleware('auth')




Route.post('vendas', 'VendaController.store').middleware('auth')
Route.get('vendas', 'VendaController.index').middleware('auth')

Route.post('contatos', 'ContatoController.store').middleware('auth')
Route.patch('contatos/:id', 'ContatoController.update').middleware('auth')

Route.post('enderecos', 'EnderecoController.store').middleware('auth')
Route.patch('enderecos/:id', 'EnderecoController.update').middleware('auth')
Route.get('enderecos', 'EnderecoController.index').middleware('auth')


