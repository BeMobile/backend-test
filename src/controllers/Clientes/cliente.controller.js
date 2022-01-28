const Cliente = require("../../models/Clientes/cliente.model.js");
const Contato = require("../../models/Clientes/contato.model.js");
const Endereco = require("../../models/Clientes/endereco.model.js");

exports.create = (req, res) => {


	if (!req._body) {
		return res.status(400).send({ message: "O conteúdo não pode estar vazio!" });
	}
	const { id, nome, cpf, genero, data_nascimento, telefone,
		email, cep, estado, cidade, logradouro, numero, complemento, bairro } = req.body;

	const cliente = new Cliente({
		id: id,
		nome: nome,
		cpf: cpf,
		genero: genero || null,
		data_nascimento: data_nascimento || null

	});

	Cliente.create(cliente, (err, data) => {
		if (err) {
			if (err.message !== '') {
				res.status(400).send(err);
			} else {
				res.status(500).send({ message: "Ocorreu algum erro ao cadastrar usuario." });
			}

		} else {
			
			const contato = new Contato({
				id: id,
				id_cliente: data.idInsert,
				telefone: telefone,
				email: email

			});
			
			Contato.create(contato, (err1, data1) => {
				if (err1) {
					
					if (err1.message !== '') {
						res.status(400).send(err1);
					} else {
						res.status(500).send({ message: "Ocorreu algum erro ao cadastrar contato." });
					}
				} else {
					
					const end = new Endereco({
						id: id,
						id_cliente: data.idInsert,
						cep: cep,
						estado: estado,
						cidade: cidade,
						bairro: bairro || null,
						logradouro: logradouro || null,
						numero: numero || 0,
						complemento: complemento || null

					});
					Endereco.create(end, (err2, data2) => {
						if (err2) {
							if (err2.message !== '') {
								res.status(404).send(err2);
							} else {
								res.status(500).send(err2);
							}
						} else {

							res.status(200).send({ cliente: data, contato: data1, endereco: data2 });


						}

					});




				}


			});


		}



	});


}
exports.index = (req, res) => {


	Cliente.index((err, data) => {
		if (err) {
			if (err.message !== '') {
				res.status(404).send(err);
			} else {
				res.status(500).send({ message: "Erro ao buscar clientes " });
			}
		} else {
			res.status(200).send(data);
		}
	});


}
exports.show = (req, res) => {


	Cliente.show(req.params.id, req.body, (err, data) => {
		if (err) {
			if (err.message !== '') {
				res.status(404).send(err);
			} else {
				res.status(500).send({ message: "Erro ao buscar cliente com id:  " + req.params.id });
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

	Cliente.update(
		req.params.id, req.body, (err, data) => {
			if (err) {
				if (err.message !== '') {
					res.status(404).send(err);
				} else {
					res.status(500).send({ message: "Erro ao realizar alteração no cliente com id:  " + req.params.id });
				}
			} else {

				res.status(200).send(data);
			}
		});

}
exports.delete = (req, res) => {


	Cliente.delete(req.params.id, (err, data) => {
		if (err) {
			if (err.message !== '') {
				res.status(404).send(err);
			} else {
				res.status(500).send({ message: "Não foi possível deletar cliente com id:  " + req.params.id });
			}
		} else {
			res.status(200).send({ message: "O cliente foi excluido com sucesso!" });
		}
	});

}