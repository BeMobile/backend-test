# BeMobile

### Como utilizar a API:

1 - Primeiramente faça o clone deste repositório para a sua máquina, vá até o arquivo EXAMPLE.env, e renomeie apenas para .env e adicione os dados nos locais indicados

2 - Faça o download do banco de dados que está na pasta `download_database` e faça o import no MySQLWorkbench.

3 - Rode no terminal o comando `npm install` que instalará automaticamente todas as dependências necessárias para rodar a API e depois rode o comando `npm start` para iniciar.

4 - Realize o login como método POST na seguinte rota:

> YOUR-HOST:4040/users/signin

passando no corpo com formato JSON:

```
 {
    "email": "admin@admin.com",
    "password": "admin"
}
```

5 - Caso queira, poderá fazer o cadastro de um novo usuário usando o método POST na rota:

> YOUR-HOST:4040/users/signup

```
 {
    "email": " ",
    "password": " "
}
```

6 - Após realizar o login com seu usuário, você receberá um token, e deverá utilizá-lo no header das requisições com o seguinte formato:
Caso esteja utilizando o POSTMAN vá até a parte HEADERS e no campo KEY escreva: Authorization. E no campo VALUE insira o token que foi gerado no passo anterior.

7 - Caso queira cadastrar um novo cliente, utilize o método POST na rota:

> YOUR-HOST:4040/clients

passando os campos no body da requisição no formato JSON conforme o exemplo abaixo:

```
 {
    "name": " ",
    "cpf": " ",
    "address": " ",
    "phone": " "
}
```

9 - Para listar todos os clientes utilize o método GET na rota:

> YOUR-HOST:4040/clients

10 - Para ver as informações de um cliente específico, utilize o método GET na rota abaixo. Passando o id desejado na URL:

> YOUR-HOST:4040/clients/ID

11 - Para deletar um cliente, utilize o método DELETE na rota abaixo, passando na URL o id do cliente que deseja deletar

> YOUR-HOST:4040/clients/ID

12 - Para atualizar os dados de um cliente, utilize o método PUT, na rota abaixo, fornecendo na URL o ID do cliente que deseja atualizar

> YOUR-HOST:4040/clients/ID

e no body passe os dados que deseja atualizar:

```
 {
    "name": " ",
    "cpf": " ",
    "address": " ",
    "phone": " "
}
```

13 - Caso queira cadastrar um novo produto, utilize o método POST na rota:

> YOUR-HOST:4040/products

passando os campos no body da requisição no formato JSON conforme o exemplo abaixo:

```
 {
    "name": " ",
    "price": " ",
    "description": " "
}
```

14 - Para listar todos os produtos utilize o método GET na rota:

> YOUR-HOST:4040/products

15 - Para ver as informações de um produto específico, utilize o método GET na rota abaixo. Passando o id desejado na URL:

> YOUR-HOST:4040/products/ID

16 - Para deletar um cliente, utilize o método DELETE na rota abaixo, passando na URL o id do cliente que deseja deletar

> YOUR-HOST:4040/products/ID

17 - Para atualizar os dados de um cliente, utilize o método PUT, na rota abaixo, fornecendo na URL o ID do cliente que deseja atualizar

> YOUR-HOST:4040/products/ID

e no body passe os dados que deseja atualizar:

```
 {
    "name": " ",
    "price": " ",
    "description": " "
}
```

18 - Para cadastrar uma venda utilize o método POST na rota abaixo, passando os dados como no exemplo abaixo, ele irá retornar todos os dados e o dia em que foi feita a compra:

> YOUR-HOST:4040/sales

```
 {
    "client_id": "PASSE O ID DO CLIENTE QUE ESTÁ REALIZANDO A COMPRA ",
    "product": " DIGITE O PRODUTO QUE O CLIENTE ESTÁ COMPRANDO ",
    "amount": " DIGITE A QUANTIDADE ",
    "price": " DIGITE O PREÇO TOTAL DA COMPRA "
}
```
