# Bemobile API backend-test

	API RESTful ligada a um Banco de dados utilizando esta API. Trate-se de um sistema que permite cadastrar usuários externamente e, ao realizarem login, registrar clientes, produtos(carros) e vendas.
--------------------------------------------------------------------------------

## Banco de dados

Como a API está integrada a um banco de dados MYSQL deve-se verificar os parametros de integração com o banco no arquivo ".env", verificar o servidor local, porta do banco de dados usuário e senha a fim de que API tenha acesso ao banco de dados. A API espera que no banco exista uma DATABASE chamada "bemobile" caso não haja basta criar ou mudar no nome da DATABASE no arquivo ".env".
Configurar os parametros abaixo no arquivo ".env" para permitir a integração com o banco:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=admin
DB_DATABASE=bemobile

--------------------------------------------------------------------------------

### Start
Após configurar o arquivo env, basta executar o comando "npm start" que será executado as migrations e irá executar o servidor na porta 3333.

 npm start

--------------------------------------------------------------------------------

#### Consumo da API
Na pasta do projeto existe um arquivo chamado "RotasAPI.json" que pode ser importado no insomina ou postman, caso importe o arquivo todas as rotas e o json esperado durante a criação já está configurado sendo necessário apenas passar os dados para criação.

As rotas para clientes, produtos, login, vendas estão descritas abaixo juntamente com o JSON necessário.

Apenas a rota de login e de signup não precisam de token todas as outras o token gerado na rota de login deve ser passado no Bearer do API Client para acessar as rotas.

--------------------------------------------------------------------------------

##### Rotas
Rotas para Login:
	Método: POST
	URL: http://127.0.0.1:3333/signup
	JSON esperado:
	{
		"username": "testeXXX",
		"email": "teste@gmail.com",
		"password": "123456"
	} 

	Método: POST
	URL: http://127.0.0.1:3333/login
	JSON esperado:
	{
		"email": "teste@gmail.com",
		"password": "123456"
	}	 

--------------------------------------------------------------------------------
Rotas Product(Car):
	Método: GET
	URL: http://127.0.0.1:3333/car/index

	Método: GET
	URL: http://127.0.0.1:3333/car/show/:id
	** Necessário informar o ID do produto na rota **

	Método: POST
	URL: http://127.0.0.1:3333/car/store
	JSON esperado:
	{
		"title": "Celta verde",
		"description": "celta basicão, ano 2013", 
		"color":"Branco",
		"fuel_type":"Gasolina",
		"brand": "Chevrolet",
		"model": "celta",
		"features":"direção hidraulica, vidro eletrico, trava eletrica, alarme",
		"transmission": " 5 marchas",
		"price": 12.350, 
		"mileage": 153553
	}

	Método: PUT
	URL: http://127.0.0.1:3333/car/update/:id
	JSON esperado:
	{
		"title": "Celta Amarlo",
		"description": "celta basicão, ano 2013", 
		"color":"Branco",
		"fuel_type":"Gasolina",
		"brand": "Chevrolet",
		"model": "celta",
		"features":"direção hidraulica, vidro eletrico, trava eletrica, alarme",
		"transmission": " 5 machas",
		"price": 10350, 
		"mileage": 333553
	}
	** Necessário informar o ID na rota para realizar o update **
	** Somente o usuário que cadastrou pode realizar o update **

	Método: DELETE
	URL: http://127.0.0.1:3333/car/delete/:id
	** Necessário informar o ID na rota para realizar o delete **
	** Somente o usuário que cadastrou pode realizar o delete **

--------------------------------------------------------------------------------

Rotas para cliente(Customer):
	Método: GET
	URL: http://127.0.0.1:3333/customer/index

	Método: GET
	URL:http://127.0.0.1:3333/customer/show/:id
	** Necessário informar o ID do do cliente(customer) na rota **

	Método: POST
	URL: http://127.0.0.1:3333/customer/store
	JSON esperado:
	{
		"name": "teste",
		"adress": "Quadra 47 rua 123", 
		"cpf":"99999999",
		"phone": 61996696,
		"cell_phone": "619999666"
	}

	Método: PUT
	URL: http://127.0.0.1:3333/customer/update/:id
	JSON esperado:
	{
		"name": "TTT",
		"adress": "Quadra 55 rua oliveira", 
		"cpf":"1285883321",
		"phone": "614488112",
		"cell_phone": "6125553321"
	}
	** Necessário informar o ID na rota para realizar o update **
	

	Método: DELETE
	URL: http://127.0.0.1:3333/customer/delete/:id
	** Necessário informar o ID na rota para realizar o delete **
	** Somente o usuário que cadastrou pode realizar o delete **
--------------------------------------------------------------------------------

Rota para venda:
	Método: POST
		URL: http://127.0.0.1:3333/sale/store
		JSON esperado:
		{
			"customer_id": 3,
			"car_id": 2
		}
	** Necessário passar o ID do cliente e o ID do carro no body **


/* Desde já agradeço a oportunidade de participar desse processo seletivo, até aqui foi de grande valia todas as etapas para minha carreira e para minha vida pessoal, e foi um enorme aprendizado poder realizar esse desafio, foi desafiador e estimulante, não consegui entregar 100% pois ficou faltando a parte de pesquisa através do filtro, mas sinto que fiz o meu melhor até aqui e mais uma vez obrigado pela oportunidade...*/ 