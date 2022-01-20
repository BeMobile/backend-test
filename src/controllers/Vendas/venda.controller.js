const Venda = require("../../models/Vendas/venda.model.js");
const jwt = require("../JWT");

exports.create = (req, res) => {

	var token = jwt.verifyJWT(req, res);

	if (token === true) {
		if (!req._body) {
			return res.status(400).send({
				message: "O conteúdo não pode estar vazio!"
			});
		}
		if (req.body.id_cliente === '' || req.body.id_produto === ''
			|| req.body.quantidade === '' || req.body.preco_unit === '') {
			return res.status(400).send({
				message: "Os campos id_cliente, id_produto, quantidade, preco_unit não podem serem vazios."
			});
		}
		if (req.body.id_cliente === undefined || req.body.id_produto === undefined
			|| req.body.quantidade === undefined || req.body.preco_unit === undefined) {
			return res.status(400).send({
				message: "Os campos id_cliente, id_produto, quantidade, preco_unit não podem serem indefinidos!!"
			});
		}

		var venda = new Venda({
			id: req.body.id,
			id_cliente: req.body.id_cliente,
			id_produto: req.body.id_produto,
			quantidade: req.body.quantidade,
			preco_unit: req.body.preco_unit,

		});


		Venda.create(venda, (err, data) => {

			if (err) {
				res.status(500).send({
					message: "Ocorreu algum erro ao cadastrar uma venda."
				});
			} else {
				res.send(data);
			}

		});
	}

}