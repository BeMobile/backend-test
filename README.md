

Agradeço pela oportunidade de realizar este teste, aprendi muito ao aceitar este 
desafio, tive dificuldades com interação entre as tabelas pois não tinha feito antes em laravel, tive muitos problemas em criar a autenticação com jwt, pois minha maquina não reconhecia a versão, mas consegui com muita garra e determinação, não consegui testar todas as rotas, mas como são basicamente iguais, não terá problama com elas.
Foi feito crud do cliente, produto; cadastro do usuario com token, achei interessante criar uma entidade endereço, porem não deu pra concluir toda; lista da venda.

Segue com comandos para o teste


1) Login::GET, http://127.0.0.1:8000/api/v1/users

2) Register::POST, http://127.0.0.1:8000/api/v1/users

client

3) List::GET,http://127.0.0.1:8000/api/v1/clients

4) Store::POST, http://127.0.0.1:8000/api/v1/clients

5) Show::GET, URL:http://localhost:8000/api/v1/clients/{id}

6) Update::PUT, URL:http://localhost:8000/api/v1/clients/{id}

7) Delete::DELETE, URL:http://localhost:8000/api/clients/{id}

products

8) List::GET,http://127.0.0.1:8000/api/v1/products

9) Store::POST, http://127.0.0.1:8000/api/v1/products

10) Show::GET, URL:http://localhost:8000/api/v1/products/{id}

11) Update::PUT, URL:http://localhost:8000/api/v1/products/{id}

12) Delete::DELETE, URL:http://localhost:8000/api/products/{id}

Sale

List::GET,http://127.0.0.1:8000/api/v1/products
