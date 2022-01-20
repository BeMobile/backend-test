const Enums = require('../Models/Enums')
const Database = require('../Models/Database')
const { Produto } = Database

exports.findAll = (req, res) =>
{
	Produto.findAll({
		where: { published: 1},
		order: [['id']],
		attributes: ['id', 'nome', 'preco']
	}).then(data =>
	{
		res.send(data)
	}).
	catch(error =>
	{
		res.status(Enums.INTERNAL_SERVER_ERROR).send({
			message: error.message || 'Algum erro ocorreu durante a tentativa. Tente novamente mais tarde.'
		});
	})
}

exports.create = (req, res) => 
{
	if (!req.body.nome || !req.body.preco || !req.body.autor || !req.body.editora)
	{
		res.status(Enums.BAD_REQUEST).send({ message: 'Dados invalidos!' });
		return
	}

	const produto = 
	{
		nome: req.body.nome,
		preco: req.body.preco,
		autor: req.body.autor,
		editora: req.body.editora,
		published: 1
	}

	Produto.create(produto).
	then(data =>
	{
		res.send(data)
	}).
	catch(error =>
	{
		res.status(Enums.INTERNAL_SERVER_ERROR).send({
			message: error.message || 'Algum erro ocorreu durante a criacao do produto. Tente novamente mais tarde.'
		});
	})
}