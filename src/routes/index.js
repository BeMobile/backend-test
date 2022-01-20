var user = require('./Usuarios/user.routes.js');
var cliente = require('./Clientes/cliente.routes.js');
var produto = require('./Produtos/produto.routes.js');
var venda = require('./Vendas/venda.routes.js');

module.exports = app => {
	[].concat(
	app.use('', user),
	app.use('/clientes', cliente),
	app.use('/produtos', produto),
	app.use('/vendas', venda),
	)
};

