const Database = require('../Models/Database')
const { Usuario } = Database
const JWT = require('jsonwebtoken')
const Enums = require('../Models/Enums') 

exports.login = async (req, res) =>
{
	if (!req.body.email || !req.body.senha)
	{
		return res.status(Enums.BAD_REQUEST).send({ message: 'Dados invalidos!' })
	}

    const result = await Usuario.findOne({ where: { email: req.body.email, senha: req.body.senha } })
    if (result)
    {
        const ID = result.dataValues.id
        const token = JWT.sign({ ID }, process.env.secret, {
            expiresIn: parseInt(process.env.expires, 10)
        })

        return res.status(Enums.SUCESSFULL).send({ auth: true, token })
    }
    
    return res.status(Enums.BAD_REQUEST).send({ message: 'Email/Senha invalido!.' })
}