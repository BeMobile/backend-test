const Produto = require("../../models/Produtos/produto.model.js");


exports.create = (req, res) => {


	if (!req._body) {
		return res.status(400).send({ message: "O conteúdo não pode estar vazio!" });
	}
	const { id, cod_produto, autor, titulo, subtitulo, editora,
		preco, ativo, edicao, ano_edicao } = req.body;



	const produto = new Produto({
		id: id,
		cod_produto: cod_produto,
		titulo: titulo,
		subtitulo: subtitulo,
		autor: autor,
		editora: editora,
		edicao: edicao,
		ano_edicao: ano_edicao,
		preco: preco,
		ativo: ativo,

	});


	Produto.create(produto, (err, data) => {
		if (err) {
			if (err.message !== '') {
				res.status(404).send(err);
			} else {
				res.status(500).send({ message: "Ocorreu algum erro ao cadastrar produto." });
			}

		} else {
			res.status(200).send(data);
		}

	});


}
exports.index = (req, res, next) => {

	Produto.index((err, data) => {
		if (err) {
			if (err.message !== '') {
				res.status(404).send(err);
			} else {
				res.status(500).send({ message: "Erro ao buscar produtos" });
			}
		} else {
			res.status(200).send(data);
		}
	});


}
exports.show = (req, res) => {


	Produto.show(req.params.id, (err, data) => {
		if (err) {
			if (err.message !== '') {
				res.status(404).send(err);
			} else {
				res.status(500).send({ message: "Erro ao buscar produto com id:  " + req.params.id });
			}
		} else {
			res.status(200).send(data);
		}
	});

}

exports.update = (req, res) => {

	if (!req._body) {
		return res.status(400).send({ message: "O conteúdo não pode estar vazio!" });
	}


	Produto.update(
		req.params.id, req.body, (err, data) => {
			if (err) {

				if (err.message !== '') {
					res.status(404).send(err);
				} else {
					res.status(500).send({ message: "Erro ao realizar alteração no produto com id:  " + req.params.id });
				}
			} else {
				res.status(200).send(data);
			}
		});

}
exports.delete = (req, res) => {

	Produto.delete(req.params.id, (err, data) => {
		if (err) {
			if (err.message !== '') {
				res.status(404).send(err);
			} else {
				res.status(500).send({ message: "Não foi possível deletar produto com id:  " + req.params.id });
			}
		} else {
			res.status(200).send({ message: `O produto foi excluido com sucesso!` });
		}
	});

}