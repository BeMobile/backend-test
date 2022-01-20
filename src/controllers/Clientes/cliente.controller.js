const Cliente = require("../../models/Clientes/cliente.model.js");
const Contato = require("../../models/Clientes/contato.model.js");
const Endereco = require("../../models/Clientes/endereco.model.js");

const jwt = require("../JWT");

exports.create = (req, res) => {

	var token = jwt.verifyJWT(req, res);

	if (token === true) {
		if (!req._body) {
			return res.status(400).send({
				message: "O conteúdo não pode estar vazio!"
			});
		}
		if (req.body.nome === '' || req.body.cpf === '' ||
			req.body.telefone === '' || req.body.cep === ''
			|| req.body.numero === '' || req.body.email === '') {
			return res.status(400).send({
				message: "Os campos nome, cpf, telefone,email,  cep e numero não podem serem vazios."
			});
		}
		if (req.body.nome === undefined || req.body.cpf === undefined ||
			req.body.telefone === undefined || req.body.cep === undefined ||
			req.body.numero === undefined || req.body.email === undefined) {

			return res.status(400).send({
				message: "Campos nome, cpf, telefone, email, cep e numero não podem ser indefinidos!!"
			});
		}

		const cliente = new Cliente({
			id: req.body.id,
			nome: req.body.nome,
			cpf: req.body.cpf,
			genero: req.body.genero,
			data_nascimento: req.body.data_nascimento

		});

		Cliente.create(cliente, (err, data) => {
			if (err) {
				res.status(500).send({
					message: "Ocorreu algum erro ao cadastrar usuario."
				});
			} else {

				if (data.erro !== undefined) {
					res.send(data);
				} else {
					const contato = new Contato({
						id: req.body.id,
						id_cliente: data.idInsert,
						telefone: req.body.telefone,
						email: req.body.email

					});

					Contato.create(contato, (err1, data1) => {
						if (err1) {
							res.status(500).send({
								message: "Ocorreu algum erro ao cadastrar contato."
							});
						} else {
							if (data1.erro !== undefined) {
								res.send(data1);
							} else {
								const end = new Endereco({
									id: req.body.id,
									id_cliente: data.idInsert,
									cep: req.body.cep,
									estado: req.body.estado,
									cidade: req.body.cidade,
									bairro: req.body.bairro,
									logradouro: req.body.logradouro,
									numero: req.body.numero,
									complemento: req.body.complemento

								});
								Endereco.create(end, (err2, data2) => {
									if (err2) {
										res.status(500).send({
											message: "Ocorreu algum erro ao cadastrar endereco."
										});
									} else {
										if (data2.erro !== undefined) {
											res.send(data2);
										} else {
											res.send({ cliente: data, contato: data1, endereco: data2 });
										}

									}

								});
							}



						}


					});
				}

			}



		});
	}

}
exports.index = (req, res) => {
	var token = jwt.verifyJWT(req, res);

	if (token === true) {

		Cliente.index((err, data) => {
			if (err) {
				if (err.kind !== '') {
					res.status(404).send({
						message: err.kind
					});
				} else {
					res.status(500).send({
						message: "Erro ao buscar clientes "
					});
				}
			} else {
				res.send(data);
			}
		});
	}

}
exports.show = (req, res) => {
	var token = jwt.verifyJWT(req, res);

	if (token === true) {

		Cliente.show(req.params.id, req.body, (err, data) => {
			if (err) {
				if (err.kind !== '') {
					res.status(404).send({
						message: err.kind
					});
				} else {
					res.status(500).send({
						message: "Erro ao buscar cliente com id:  " + req.params.id
					});
				}
			} else {
				res.send(data);
			}
		});
	}
}

exports.update = (req, res) => {
	var token = jwt.verifyJWT(req, res);

	if (token === true) {


		if (!req._body) {
			return res.status(400).send({
				message: "O conteúdo não pode estar vazio!"
			});
		}
		if (req.body.nome === '' || req.body.cpf === '') {
			return res.status(400).send({
				message: "Os campos nome, cpf  não podem serem vazios."
			});
		}
		if (req.body.nome === undefined || req.body.cpf === undefined) {

			return res.status(400).send({
				message: "Campos nome, cpf  não podem ser indefinidos!!"
			});
		}



		Cliente.update(
			req.params.id, req.body, (err, data) => {
				if (err) {
					if (err.kind !== '') {
						res.status(404).send({
							message: err.kind
						});
					} else {
						res.status(500).send({
							message: "Erro ao realizar alteração no cliente com id:  " + req.params.id
						});
					}
				} else {

					res.send(data);
				}
			});
	}
}
exports.delete = (req, res) => {
	var token = jwt.verifyJWT(req, res);

	if (token === true) {


		Cliente.delete(req.params.id, (err, data) => {
			if (err) {
				if (err.kind !== '') {
					res.status(404).send({
						message: err.kind
					});
				} else {
					res.status(500).send({
						message: "Não foi possível deletar cliente com id:  " + req.params.id
					});
				}
			} else {
				res.send({ message: "O cliente foi excluido com sucesso!" });
			}
		});
	}
}