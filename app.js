const express = require('express');
const app = express();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { eAdmin } = require('./middlewares/auth');
const User = require('./models/User');
const Cliente = require('./models/Cliente');

app.use(express.json());
//eAdmin - olha se o usuario está logado com o token

app.post('/', eAdmin, async (req, res) => { // cadastro de clientes

 var dadosClientes = req.body;

    await Cliente.create(dadosClientes)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Cliente cadastrado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Cliente não cadastrado!"
            });
        });



});


app.get('/index', eAdmin, async (req, res) => {  //lista clientes cadastrados

    const valor = await Cliente.findAll({
        attributes: ['id', 'nome', 'cpf'],
        order: [['id']]
    })

    return res.json({
        erro: false,
        mensagem: valor
    });



});

app.post('/singup', async (req, res) => { //cadastro de usuário do sistema
    var dadosUser = req.body;

    dadosUser.senha = await bcrypt.hash(dadosUser.senha, 8);

    await User.create(dados)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Usuário cadastrado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuário não cadastrado!"
            });
        });

        
});

app.post('/login', async (req, res) => { // faz login na conta do user 

    const user = await User.findOne({
        attributes: ['id', 'nome', 'email', 'senha'],
        where: {
            email: req.body.email
        }
    });

    if (user === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta!"
        });
    }

    if (!(await bcrypt.compare(req.body.senha, user.senha))) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta!"
        });
    }

    var token = jwt.sign({ id: user.id }, "D62ST92Y7A6V7K5C6W9ZU6W8KS3", {
        expiresIn: '7d'
    });

    return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso!",
        token
    });
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});