# Bemobile - Teste Backend

## Requisitos para rodar e testar o projeto

É necessário ter instalado:

- [NodeJS](https://nodejs.org/en/)
- [Docker](https://www.docker.com)
- [Postman](https://www.postman.com)/[Insomnia](https://insomnia.rest/download)

## Como rodar?

Para rodar o projeto é necessário clonar o repositório em seu computador:

```
  git clone urldorepositorio
```

Depois acessar a pasta através de:

```
  cd backend-test
```

Dentro da pasta do projeto precisamos instalar as depêndencias dele através do comando:

```
  // Caso prefira utilizar o yarn
  yarn

  // Caso prefira utilizar o npm
  npm install
```

Com as dependências instaladas podemos rodar o projeto pelo terminal através do comando:

```
  // Caso prefira utilizar o yarn
  yarn dev

  // Caso prefira utilizar o npm
  npm run dev
```

Com o servidor do projeto rodando vamos precisar agora criar um container no docker que irá conter o nosso banco de dados mysql.
</br>
Para isso com o docker instalado e rodando no computador basta abrirmos outro terminal do nosso projeto e digitar o comando:

```
  docker-compose up
```

Ele pode levar algum tempo para baixar a imagem e os outros arquivos necessários para criar o container e no final o container vai estar rodando com o nosso banco de dados. E assim vamos poder utilizar o Postman/insomnia ou algum outro semelhante para testar as rotas.

## Rotas

### User

- POST: http://localhost:8000/signup => Essa rota é utilizada para criar um usuário/vendedor, para criar um usuário/vendedor é necessário passar as seguintes informações no corpo da requisição:

  - name,
  - phone,
  - email,
  - password,
  - passwordConfirmation
    </br>

  Não será possível criar um usuário com uma senha que não seja válida ou com um email já cadastrado.

- POST: http://localhost:8000/signin => Essa rota é utilizada para logar/autenticar um usuário no sistema, para isso é necessário passar no corpo da requisição as seguintes informações:

  - email,
  - password </br>

  Não é possível logar/autenticar no sistema com um email ou senha incorreto.

### Clients

- POST: http://localhost:8000/clients/ => Essa rota é utilizada para criar um cliente no sistema, para acessar essa rota é necessário o usuário estar autenticado no sistema, para criarmos um cliente é necessário passar as seguintes informações no corpo da requisição:

  - name,
  - phone,
  - cpf,
  - email,
  - address,
  - city </br>

  Não é possível criar um usuário com um email ou cpf já registrado.

- GET: http://localhost:8000/clients/list => Essa rota é utilizada para listar os clientes registrados no sistema, para acessar essa rota é necessário o usuário estar autenticado no sistema, não é necessário passar nenhuma informação para esta rota, ela irá retornar todos os clientes cadastrados no sistema.

- PUT: http://localhost:8000/clients/update/:id => Essa rota é utilizada para atualizar as informações de um determinado cliente, para acessar essa rota é necessário o usuário estar autenticado no sistema, é necessário passar o id do cliente na rota e no corpo da requisição desta rota é necessário passar as informações que deseja alterar do cliente:

  - name,
  - phone,
  - email,
  - address,
  - city </br>

  Não é possível alterar o CPF do cliente.

- DELETE: http://localhost:8000/clients/delete/:id => Essa rota é utilizada para deletar um cliente que esteja registrado no sistema, para acessar essa rota é necessário o usuário estar autenticado no sistema, é necessário passar na rota o id do cliente que deseja deletar. Não é possível deletar um cliente que não existe.

### Products

- POST: http://localhost:8000/products/ => Essa rota é utilizada para criar um produto no sistema, para acessar essa rota é necessário o usuário estar autenticado no sistema, para criarmos um produto é necessário passar as seguintes informações no corpo da requisição:

  - name,
  - price,
  - category
  - description </br>

  Não é possível criar um produto com um nome já registrado.

- GET: http://localhost:8000/products/list => Essa rota é utilizada para listar os produtos registrados no sistema, para acessar essa rota é necessário o usuário estar autenticado no sistema, não é necessário passar nenhuma informação para esta rota, ela irá retornar todos os produtos cadastrados no sistema.

- GET: http://localhost:8000/products/find/:id => Essa rota é utilizada para procurar por um produto registrado no sistema através do seu id, para acessar essa rota é necessário o usuário estar autenticado no sistema, não é necessário passar nenhuma informação para esta rota mas é necessário passar o id do produto na rota, ela irá retornar o produto com o id passado caso ele esteja registrado.

- PUT: http://localhost:8000/products/update/:id => Essa rota é utilizada para atualizar as informações de um determinado produto, para acessar essa rota é necessário o usuário estar autenticado no sistema, é necessário passar o id do produto na rota e no corpo da requisição desta rota é necessário passar as informações que deseja alterar do produto:

  - name,
  - price
  - category
  - description </br>

- DELETE: http://localhost:8000/products/delete/:id => Essa rota é utilizada para deletar um produto que esteja registrado no sistema, para acessar essa rota é necessário o usuário estar autenticado no sistema, é necessário passar na rota o id do produto que deseja deletar. Não é possível deletar um produto que não existe.

### Sales

- POST: http://localhost:8000/sales/ => Essa rota é utilizada para criar uma venda no sistema, para acessar essa rota é necessário o usuário estar autenticado no sistema, para criarmos uma venda é necessário passar as seguintes informações no corpo da requisição:

  - quantity,
  - client_id,
  - product_id </br>

  Não é possível criar uma venda com um produto ou cliente que não existe.

- GET: http://localhost:8000/products/findSales/ => Essa rota é utilizada para procurar pelas vendas realizadas a um cliente em especifico, para acessar essa rota é necessário o usuário estar autenticado no sistema, para fazer a busca é necessário passar o id do cliente no corpo da requisição:

  - client_id </br>

  Não é possível encontrar as vendas realizadas para um cliente que não existe.

## Observações

- Tentei iniciamente rodar o banco mysql normalmente pelo meu pc mas tive algumas dificuldades/problemas com configuração e acabei optando por utilizar docker o que facilitou o uso.
- Nunca tinha feito nada com MVC anterior, acredito que acabei fugindo um pouco da arquitetura do MVC utilizando repositórios e services.
