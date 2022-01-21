# Backend API REST Laravel

## Requisitos para rodar e testar o projeto

Requisitos:

- [Composer](https://getcomposer.org/)
- PHP (7++ de preferência)
- [Laravel](https://laravel.com/)
- [Postman](https://www.postman.com)
- IDE de sua escolha, como Visual studio code ou PHPStorm, por exemplo.

## Como rodar?
#### As etapas a seguir são feitas passo a passo para que haja 100% de certeza de que o projeto irá rodar perfeitamente. Pode não ser necessário passar por tantas etapas assim, mas sempre faço todas para garantir.

Fazer GIT CLONE do url deste repositório:

```
  - git clone https://github.com/Taiguinho/backend-test
```

Abra o projeto no seu IDE e na aba Terminal digite:

```
  - composer install --ignore-platform-reqs
  (o "--ignore-platform-reqs" é por conta dos pacotes JWT e você o usará caso use o laravel 8)
```

Na raíz do projeto, fica o arquivo .env  e nele deve conter os dados de acesso do banco de dados. É necessário apenas que haja um database cadastrado no localhost ou sua hospedagem pessoal. <br>
Os dados do Banco de dados MySQL devem ficar no arquivo .env neste trecho:
```
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE= (NOMEDATABASE)
  DB_USERNAME=root
  DB_PASSWORD=
```
Também é recomendado (não necessariamente precise deste passo) que no arquivo env. seja feita a modificação (comando que desliga o debugador do laravel para ser usado apenas em fins de desenvolvimento):
```
  APP_ENV=production
  APP_DEBUG=false
```

Recomendo gerar um app_key para o projeto:

```
  - php artisan key:generate
```


Agora vamos criar o nosso banco de dados com o comando:

```
  - php artisan migrate:fresh
```


Para rodar o projeto, digite o comando no terminal:

```
  - php artisan serve
```

Qualquer erro que venha a acontecer ao tentar rodar o projeto ou acessar as rotas, rode estes comandos no terminal e use o comando para rodar o projeto novamente, estes comandos irão zerar todos os possíveis caches ou dados temporários que possam causar anomalias ao rodar o projeto.
```
  - php artisan clear-compiled
  - php artisan auth:clear-resets
  - php artisan cache:clear
  - php artisan config:clear
  - php artisan event:clear
  - php artisan optimize:clear 
  - php artisan route:cache 
  - php artisan view:clear
```

Se tudo der certo, o terminal do Laravel mostrará uma mensagem parecida com esta:

```
  Starting Laravel development server: http://127.0.0.1:8000
  [Thu Jan 19 20:57:02 2022] PHP 8.0.13 Development Server (http://127.0.0.1:8000) started
```

Pronto, agora a ApiRest está funcionando. 

## Rotas

### Usuários

- Criação de um usuário no sistema, você irá receber uma response com uma mensagem de confirmação da criação do usuário. a requisição deverá conter os seguintes campos: 

    - nome
    - email
    - password
    
```
- (POST)

  /signup
  
  (http://127.0.0.1:8000/signup)
```
-   Login de usuário, a requisição deverá conter os seguintes campos:

    - email
    - password
      </br>

```
- (POST)

  /login
  
  (http://127.0.0.1:8000/login)
```


### Clientes

<hr>

- Lista todos os clientes cadastrados no sistema com apenas os dados principais, ordenado por id

```
- (GET)

/clientes

(http://127.0.0.1:8000/clientes)
```
<hr>

- Detalha um cliente e as vendas feitas à ele(a) (show)

```

- (GET)

  /clientes/{id}
  
  (http://127.0.0.1:8000/clientes/{id})
  
```

<hr>

- Adiciona um novo cliente no sistema (store), a requisição deverá conter os seguintes campos:
    - cpf
    - nome
    - telefone
    - cep
    - rua
    - numero
    - complemento (pode ser null)
    - bairro
    - cidade
    - estado
      </br>

```
- (POST) 

  /clientes
  
  (http://127.0.0.1:8000/clientes)
```

<hr>

- Editar um  cliente (update), a requisição deverá conter os seguintes campos:
    - cpf
    - nome
    - telefone
    - cep
    - rua
    - numero
    - complemento (pode ser null)
    - bairro
    - cidade
    - estado
      </br>

```
- (PUT) 

  /clientes/{id}
  
  (http://127.0.0.1:8000/clientes/{id})
```


<hr>

- Deleta um novo cliente do sistema (delete) e as vendas feitas a ele.
    

```
- (DELETE) 

  /clientes/{id}
  
  (http://127.0.0.1:8000/clientes/{id})
```
<hr>

### Produtos

- Criação de um produto no sistema, a requisição deverá conter os seguintes campos:

    - titulo
    - descricao
    - categoria
    - link_capa (pode ser null)
    - codigo
    - preco

```
- (POST)

  /produtos
  
  (http://127.0.0.1:8000/produtos)
```
<hr>

- Lista todos os produtos cadastrados por ordem alfabetica e apenas com os dados principais

```
- (GET)

  /produtos
  
  (http://127.0.0.1:8000/produtos)
```
<hr>

- Detalha todos os detalhes de um produto (show)

```
- (GET)

  /produtos/{id}
  
  (http://127.0.0.1:8000/produtos/{id})
```
<hr>

- Update de um produto no sistema, a requisição deverá conter os seguintes campos:
    - titulo
    - descricao
    - categoria
    - link_capa (pode ser null)
    - codigo
    - preco

```
- (POST)

  /produtos/{id}
  
  (http://127.0.0.1:8000/produtos/{id})
```
<hr>

- Deletar um produto (soft-delete):


```
- (DELETE)

  /produtos/{id}
  
  (http://127.0.0.1:8000/produtos/{id})
```
<hr>

### Vendas

- Cria uma nova venda no sistema, a requisição deverá conter os seguintes campos:

    - id_cliente 
    - id_produto
    - quantidade

O sistema busca o preço do produto no banco de dados e coloca diretamente na venda, calculando também o preço total da compra.
```
- (POST)

  /vendas
  
  (http://127.0.0.1:8000/vendas)
```
<hr>

- Lista todas as vendas

```
- (GET)

  /vendas
  
  (http://127.0.0.1:8000/vendas)
```
<hr>

    
## Observações de desenvolvimento

- Facilidade em desenvolvimento de todos os processos do sistema, principal dificuldade foi nas respostas JSON para quando ocorrem inserções, updates ou deletes
- Desenvolvimento rápido do sistema, por se tratar apenas de back-end e utilizar as vantagens que o framework laravel nos proporciona.
