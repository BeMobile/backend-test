module.exports = app =>
{
	const Venda = require('../Controllers/VendasController')
	const router = require('express').Router()
  
	router.post("/", Venda.create)

	app.use('/vendas', router)
};