const User = require("../../models/Usuarios/user.model.js");

exports.create = (req, res) => {


	if (!req._body) {
		return res.status(400).send({ message: "O conteúdo não pode estar vazio!" });
	}
	const { id, nome, email, senha } = req.body;

	const user = new User({
		id: id,
		nome: nome,
		email: email,
		senha: senha

	});


	User.create(user, (err, data) => {
		if (err) {
			if (err.message !== '') {
				res.status(404).send(err);
			} else {
				res.status(500).send({ message: "Ocorreu algum erro ao cadastrar usuario." });
			}
		} else {
			res.status(200).send(data);
		}

	});


}

exports.login = (req, res) => {
	if (!req._body) {
		return res.status(400).send({ message: "O conteúdo não pode estar vazio!" });
	}

	User.getLogin(req.body, (err, data) => {
		if (err) {
			if (err.message !== '') {
				res.status(404).send(err);
			} else {
				res.status(500).send({ message: "Erro ao realizar login com email:  " + req.body.email });
			}
		} else {
			res.status(200).send(data);
		}
	});

}