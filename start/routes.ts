/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/user','UsersController.store')
Route.get('/user','UsersController.index')
Route.post("/login",'AuthController.auth')

Route.group(()=>{
    Route.post('/','ClientesController.store')
    Route.get('/','ClientesController.index')
    Route.post('/vendas/:id','ClientesController.show')
    Route.delete("/:id",'ClientesController.delete')
    Route.put("/:id",'ClientesController.update')
    
}).prefix("cliente")
  .middleware(['auth'])


Route.group(()=>{
    Route.post("/:clienteId/:produtoId",'VendasController.store')
    Route.get("/",'VendasController.index')
    
}).prefix("venda")
.middleware(['auth'])

Route.group(()=>{
    Route.post('/','ProdutosController.store')
    Route.get('/','ProdutosController.index')
    Route.get('/:id','ProdutosController.show')
    Route.delete("/:id",'ProdutosController.delete')
    Route.put("/:id",'ProdutosController.update')

}).prefix("produto")
  .middleware(['auth'])

Route.post('/endereco','EnderecosController.store')
Route.get('/endereco','EnderecosController.index')

Route.post('/telefone','TelefonesController.store')
Route.get('/telefone','TelefonesController.index')
