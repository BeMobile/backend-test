const Produto = require("../../models/Produtos/produto.model.js");


exports.create = (req, res) => {


	if (!req._body) {
		return res.status(400).send({
			message: "O conteúdo não pode estar vazio!"
		});
	}
	if (req.body.cod_produto === '' || req.body.titulo === ''
		|| req.body.autor === '' || req.body.editora === ''
		|| req.body.preco === '' || req.body.ativo === '') {
		return res.status(400).send({
			message: "Os campos cod_produto, titulo, autor, editora, preco, ativo não podem serem vazios."
		});
	}
	if (req.body.cod_produto === undefined || req.body.titulo === undefined
		|| req.body.autor === undefined || req.body.editora === undefined
		|| req.body.preco === undefined || req.body.ativo === undefined) {
		return res.status(400).send({
			message: "Os campos cod_produto, titulo, autor, editora, preco, ativo não podem serem  indefinidos!!"
		});
	}

	const produto = new Produto({
		id: req.body.id,
		cod_produto: req.body.cod_produto,
		titulo: req.body.titulo,
		subtitulo: req.body.subtitulo,
		autor: req.body.autor,
		editora: req.body.editora,
		edicao: req.body.edicao,
		ano_edicao: req.body.ano_edicao,
		estado: req.body.estado,
		cidade: req.body.cidade,
		preco: req.body.preco,
		ativo: req.body.ativo,

	});


	Produto.create(produto, (err, data) => {
		if (err) {
			res.status(500).send({
				message: "Ocorreu algum erro ao cadastrar usuario."
			});
		} else {
			res.send(data);
		}

	});


}
exports.index = (req, res, next) => {

	Produto.index((err, data) => {
		if (err) {
			if (err.kind !== '') {
				res.status(404).send({
					message: err.kind
				});
			} else {
				res.status(500).send({
					message: "Erro ao buscar produtos"
				});
			}
		} else {
			res.send(data);
		}
	});


}
exports.show = (req, res) => {


	Produto.show(req.params.id, (err, data) => {
		if (err) {
			if (err.kind !== '') {
				res.status(404).send({
					message: err.kind
				});
			} else {
				res.status(500).send({
					message: "Erro ao buscar produto com id:  " + req.params.id
				});
			}
		} else {
			res.send(data);
		}
	});

}

exports.update = (req, res) => {

	if (!req._body) {
		return res.status(400).send({
			message: "O conteúdo não pode estar vazio!"
		});
	}

	if (req.body.cod_produto === '' || req.body.titulo === ''
		|| req.body.autor === '' || req.body.editora === ''
		|| req.body.preco === '' || req.body.ativo === '') {
		return res.status(400).send({
			message: "Os campos cod_produto, titulo, autor, editora, preco, ativo não podem serem vazios."
		});
	}
	if (req.body.cod_produto === undefined || req.body.titulo === undefined
		|| req.body.autor === undefined || req.body.editora === undefined
		|| req.body.preco === undefined || req.body.ativo === undefined) {
		return res.status(400).send({
			message: "Os campos cod_produto, titulo, autor, editora, preco, ativo não podem serem  indefinidos!!"
		});
	}

	Produto.update(
		req.params.id, req.body, (err, data) => {
			if (err) {

				if (err.kind !== '') {
					res.status(404).send({
						message: err.kind
					});
				} else {
					res.status(500).send({
						message: "Erro ao realizar alteração no produto com id:  " + req.params.id
					});
				}
			} else {
				res.send(data);
			}
		});

}
exports.delete = (req, res) => {

	Produto.delete(req.params.id, (err, data) => {
		if (err) {
			if (err.kind !== '') {
				res.status(404).send({
					message: err.kind
				});
			} else {
				res.status(500).send({
					message: "Não foi possível deletar produto com id:  " + req.params.id
				});
			}
		} else {
			res.send({ message: `O produto foi excluido com sucesso!` });
		}
	});

}