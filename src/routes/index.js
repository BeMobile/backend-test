var user = require('./Usuarios/user.routes.js');
var cliente = require('./Clientes/cliente.routes.js');
var produto = require('./Produtos/produto.routes.js');
var venda = require('./Vendas/venda.routes.js');
const jwt = require("../utils/JWT");

module.exports = app => {
	[].concat(
		app.use('', user),
		app.use('/clientes', jwt.verifyJWT, cliente),
		app.use('/produtos', jwt.verifyJWT, produto),
		app.use('/vendas', jwt.verifyJWT, venda),
	)
};

