const Venda = require("../../models/Vendas/venda.model.js");


exports.create = (req, res) => {


	if (!req._body) {
		return res.status(400).send({
			message: "O conteúdo não pode estar vazio!"
		});
	}

	const { id, id_cliente, id_produto, quantidade, preco_unit } = req.body;

	var venda = new Venda({
		id: id,
		id_cliente: id_cliente,
		id_produto: id_produto,
		quantidade: quantidade,
		preco_unit: preco_unit,

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