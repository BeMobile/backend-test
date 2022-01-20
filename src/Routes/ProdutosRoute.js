const Auth = require('../Middlewares/Auth')

module.exports = app =>
{
	const Produto = require('../Controllers/ProdutosController')
	const router = require('express').Router()
  
	// Retorna todos os produtos disponiveis
	router.get('/', Produto.findAll)

	// Adiciona um produto
	router.post('/', Produto.create)

	// Exibe um produto especifico 

	// Edita um produto

	// Soft Delete
	
	app.use('/produtos', router)
}