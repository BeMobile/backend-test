## Requisitos
- estruturar o sistema observando o MVC (mas sem as views);
- deve usar mySQL no banco de dados;
- as respostas devem ser em JSON;
- pode usar recursos e bibliotecas que auxiliam na administração do banco de dados (Eloquent, Lucid, Knex, Bookshelf, etc.);
- documentar as instruções necessárias em um 
- fazer um Pull Request para este repositório ao finalizar.

Obs: caso o(a) candidato(a) não consiga completar o teste até o prazo combinado com o avaliador, deve garantir que tudo que foi efetivamente feito esteja em pleno funcionamento. Relatar no README quais foram as dificuldades encontradas.

## Critérios de Avaliação
- lógica de programação;
- organização do projeto;
- legibilidade do código;
- validação necessária dos dados;
- forma adequada de utilização dos recursos;
- seguimento dos padrões especificados;
- clareza na documentação.


# Teste Finalizado #

## Requisitos ##

- Docker
- Beekeeper ( Gerenciar o banco de dados )
- Insomnia

# Skills e Frameworks #

- Node Js
- Typescript
- Javascript
- TypeOrm
- bcryptjs
- express
- pg (postgres)
- uuid (para gerar id)
- reflect-metadata
- nodemon
- tsyringe
- JWT
- ts-node

# como rodar #

## Tanto a aplicao como o banco de dados estao em um container docker ##
- Clonar o repositório em https://github.com/fabiano1133/backend-test.git
- Acessar o repositório clonado (cd /backend-test)
- Rodar o comando no terminal yarn init -y para instalar as dependencias
- Rodar o comando docker-compose up (sobe o banco e depois o App)
- Instalar o Beekeeper Studio em https://www.beekeeperstudio.io/ (opcional)
- Caso opte pelo Beekeeper Studio {
    user: bemobile
    senha: bemobile
    database: database_backend_test
}

# Detalhamento das rotas #

## USER ##

- POST (user/) criar usuario 
-- Passar no corpo da requisicao email e password -- status 200
-- nao é permitido cadastrar um usuario com o mesmo cpf --- status 400

- POST (user/login) logar no sistema 
-- Passar no corpo da requisica email e password cadastrados -- status 200
-- Retorna o token necessário para o usuario acessar todas as rotas do sistema -- status 200
-- o token deve ser inserido na aba auth / Bearer Token (insomnia) em todas as rotas

## CLIENTS ##

- POST (/clients) criar cliente
-- Passar no corpo da requisicao nome, cpf, telefone, rua, numero, bairro, cidade e cep -- status 201
- GET (/clients) listar todos os clientes 
-- Retorna (id, nome, cpf e telefone) -- status 200
- PUT (/clients/update/:id) Altera os dados de um cliente
-- Necessario informar como parametro na rota o id do cliente (Altera todos ou alguns dados) 
- DELETE (/clients/delete/:id) deletar um cliente 
-- Necessario informar como parametro na rota o id do cliente

## PRODUCTS ( Livros ) ##

- POST (/products) cadastrar um livro
-- Passar no corpo da requisicao nome do livro, autor do livro, ano do livro, genero do livro, editora do livro, paginas do livro e preco do livro -- status 201

- GET (/products) listar todos os livros
-- Retorna (id, nome, autor, paginas e preco) -- status 200

- PUT (/products/update/:id) Altera os dados de um livro
-- Necessario informar como parametro na rota o id do livro (Altera todos ou alguns dados) -- status 200

- GET (/products/show/:id) listar um livro especifico
-- Necessario informar como parametro na rota o id do livro
-- Retorna (id, nome_livro, autor_livro, ano_livro, genero_livro, editora_livro, paginas_livro, deleted, preco)

- DELETE (/products/delete/:id) deleta um produto especifico
-- Necessario informar como parametro na rota o id do livro
-- status 200

## SALES ##

- POST (/sales) criar uma venda
- Passar no corpo da requisicao o id do cliente, id do produto e quantidade
- nao é possivel realizar um venda para um cliente que nao esta cadastrado ou de um produto que nao existe.
-- retorna status 201

- GET (/sales/show/:id) detalha uma venda
-- Necessario informar como parametro na rota o id da venda
-- retorna id da venda, produto, cliente e total

segue o link com o arquivo de rotas para o Insomnia https://drive.google.com/file/d/1RdIj0CsxGPem9BNhfjr4jtRXYJR4zSiT/view?usp=sharing


