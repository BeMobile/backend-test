const User = require("../../models/Usuarios/user.model.js");

exports.create = (req, res) => {


	if (!req._body) {
		return res.status(400).send({
			message: "O conteúdo não pode estar vazio!"
		});
	}
	if (req.body.nome === '' || req.body.email === '' || req.body.senha === '') {
		return res.status(400).send({
			message: "Os campos nome, email e senha não podem serem vazios."
		});
	}
	if (req.body.nome === undefined || req.body.email === undefined || req.body.senha === undefined) {
		return res.status(400).send({
			message: "Os campos nome, email e senha não podem serem indefinidos!!"
		});
	}

	const user = new User({
		id: req.body.id,
		nome: req.body.nome,
		email: req.body.email,
		senha: req.body.senha

	});


	User.create(user, (err, data) => {
		if (err) {
			res.status(500).send({
				message: "Ocorreu algum erro ao cadastrar usuario."
			});
		} else {
			res.send(data);
		}

	});


}

exports.login = (req, res) => {
	if (!req._body) {
		return res.status(400).send({
			message: "O conteúdo não pode estar vazio!"
		});
	}
	if (req.body.email === '' || req.body.senha === '') {
		return res.status(400).send({
			message: "Os campos email e senha não podem serem vazios."
		});
	}
	if ((req.body.email === undefined) || (req.body.senha === undefined)) {
		return res.status(400).send({
			message: "Campos email e senha não podem serem indefinidos!!"
		});
	}

	User.getLogin(req.body, (err, data) => {
		if (err) {
			if (err.kind !== '') {
				res.status(404).send({
					message: err.kind + ` Email utilizado:  ${req.body.email}.`
				});
			} else {
				res.status(500).send({
					message: "Erro ao realizar login com email:  " + req.body.email
				});
			}
		} else {
			res.send(data);
		}
	});

}