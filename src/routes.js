const express = require('express');
const usuarios = require('./controllers/usuarios');
const login = require('./controllers/login');
const produtos = require('./controllers/produtos');
const autenticacao = require('./middleware/authorization');
const clientes = require('./controllers/clientes');
const vendas = require('./controllers/vendas');


const routes = express();

// Cadastrar Usuário
routes.post('/usuarios', usuarios.cadastrarUsuario);
// Login
routes.post('/login', login.login);

// verificação de autenticação
routes.use(autenticacao);

// Cadastrar Produto
routes.post('/produtos', produtos.cadastrarProduto);
// Listar Produtos
routes.get('/produtos', produtos.listarProdutos);
// Detalhar Produto
routes.get('/produtos/:id', produtos.detalharProduto);
// Editar Produto
routes.put('/produtos/:id', produtos.editarProduto);
// Excluir Produto
routes.post('/produtos/:id/excluir', produtos.excluirProduto);

// Cadastrar Cliente
routes.post('/clientes', clientes.cadastrarCliente);
// Listar Clientes
routes.get('/clientes', clientes.listarClientes);
// Detalhar Cliente
routes.get('/clientes/:id', clientes.detalharCliente);
// Editar Cliente
routes.put('/clientes/:id', clientes.editarCliente);
// Excluir Cliente
routes.delete('/clientes/:id', clientes.excluirCliente);


// Vendas
routes.post('/vendas', vendas.venda);



module.exports = routes;