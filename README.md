# Teste de estágio de Back-end - BeMobile


## API

Solução do desafio proposto pela BeMobile, para a vaga de estágio em Back-end.
API construída com Node.JS, MySQL, AdonisJs.


# Antes de começar
## Instalação

1. Instale o Node, na versão LTS;
2. Instale o banco de dados MySQL;
3. Instale as dependências usando o yarn ou npm:  `npm install` ou ` yarn`;


## Antes de rodar:
1. Será necessário criar um banco de dados, com os comandos abaixo:
- CREATE USER root WITH PASSWORD 12345
- CREATE DATABASE teste_bemobile
- GRANT ALL PRIVILEGES ON DATABASE teste_bemobile to root

### Próximos passos

2. Execute o código de migrações: `node ace make:migration run`, que realizará as migrações e inserção de dados no banco.
3. Execute o código para rodar o projeto: `node ace serve --watch`

## Insomnia
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://raw.githubusercontent.com/JuanWeimar/backend-test/main/Insomnia_2022-01-17.json)

# API endpoints

## GET
`/clientes`  
`/clientes/:id`

`/produtos`   
`/produtos/:id` 

## PUT
`/clientes/:id`  
`/produtos/:id`

## DELETE
`/clientes/:id`  
`/produtos/:id`

## POST

`/clientes`   
`/produtos`   
`/endereco`   
`/telefones`  
`/vendas`   
`/produtos`   

### Observação
Para acessar as endpoints acima, é necessário realizar o cadastro de usuário e seu respectivo login, na rota `/usuarios` e após na rota `/login` para gerar o token de acesso.

### Dificuldades
- Tive dificuldade com as chaves estrangeiras no mysql, mas resolvi utilizando a documentação do adonis, a seguir https://docs.adonisjs.com/guides/models/relationships


