DETALHAMENTO DO PROJETO

Be mobile - Teste de Back-end
O teste de back-end da Be mobile consiste em estruturar uma API RESTful e um banco de dados ligado a esta API. Trate-se de um sistema que permite cadastrar usuários externamente e, ao realizarem login, poderão registrar clientes, produtos e vendas. O(a) candidato(a) poderá escolher desenvolver em Node.js (Adonis, Koa ou Express) ou PHP (Laravel).

Banco de Dados
O banco de dados deve ser estruturado à escolha do(a) candidato(a), mas minimamente deverá conter o seguinte:

usuários: email, senha;
clientes: nome, cpf;
endereço: todos os campos de endereço;
telefones: cliente, número;
produtos: colocar os dados necessários para um tipo de produto (livros), além de preço.
vendas: cliente, produto, quantidade, preço unitário, preço total, data e hora.

​Rotas do Sistema
cadastro de usuário do sistema (signup)
login com JWT de usuário cadastrado (login)

clientes:
listar todos os clientes cadastrados (index)
apenas dados principais devem vir aqui;
ordenar pelo id.
detalhar um(a) cliente e vendas a ele(a) (show)
trazer as vendas mais recentes primeiro;
possibilidade de filtrar as vendas por mês + ano.
adicionar um(a) cliente (store)
editar um(a) cliente (update)
excluir um(a) cliente e vendas a ele(a) (delete)

produtos:
listar todos os produtos cadastrados (index)
apenas dados principais devem vir aqui;
ordenar alfabeticamente.
detalhar um produto (show)
criar um produto (store)
editar um produto (update)
exclusão lógica ("soft delete") de um produto (delete)
vendas:
registrar venda de 1 produto a 1 cliente (store)

Obs: as rotas em clientes, produtos e vendas só podem ser acessadas por usuário logado.

Requisitos
estruturar o sistema observando o MVC (mas sem as views);
deve usar mySQL no banco de dados;
as respostas devem ser em JSON;
pode usar recursos e bibliotecas que auxiliam na administração do banco de dados (Eloquent, Lucid, Knex, Bookshelf, etc.);
documentar as instruções necessárias em um README (requisitos, como rodar, detalhamento de rotas);
fazer um Pull Request para este repositório ao finalizar.

Obs: caso o(a) candidato(a) não consiga completar o teste até o prazo combinado com o avaliador, deve garantir que tudo que foi efetivamente feito esteja em pleno funcionamento. Relatar no README quais foram as dificuldades encontradas.

Critérios de Avaliação
lógica de programação;
organização do projeto;
legibilidade do código;
validação necessária dos dados;
forma adequada de utilização dos recursos;
seguimento dos padrões especificados;
clareza na documentação.


DESCRIÇÃO DO QUE FOI IMPLEMENTADO:

ENDPOINTS:

Autenticação 
URI usada: /api/v1/login (login)
Public: SIM
Tipo: POST
Request: { "login": STRING; "password": STRING }
Return Success: { "token": JWT, "user": OBJECT }
Return Fail: { "error" : STRING }

########################################################################
Endpoints adicionais:
URI usada: /api/v1/me (Retorna um objeto com os dados do usuário logado)
Public: NÃO
Tipo: POST
Return Success: {"user": OBJECT }
Return Fail: { "error" : STRING }

URI usada: /api/v1/refresh (Renovar a autorização)
Public: NÃO
Tipo: POST
Return Success: { "token": JWT, "user": OBJECT }
Return Fail: { "error" : STRING }

URI usada: /api/v1/logout (Revogar a autorização)
Public: NÃO
Tipo: POST
Return Success: { "message": STRING }

ENDEREÇOS
URI usada: /api/v1/enderecos/store (store)
Public: Não
Tipo: POST
Request: { "cliente_id": INTEGER, "endereco": STRING, "complemento": STRING, "bairro": STRING, "cidade": STRING, "cep": STRING, "estado": STRING  }
Return Success: { "endereco" : OBJECT }
Return Fail: { "error" : STRING }

URI usada: /api/v1/enderecos/update/{ID} (update)
Public: Não
Tipo: PUT
Request: { "cliente_id": INTEGER, "endereco": STRING, "complemento": STRING, "bairro": STRING, "cidade": STRING, "cep": STRING, "estado": STRING  }
Return Success: { "endereco" : OBJECT }
Return Fail: { "error" : STRING }

URI usada: /api/v1/enderecos/delete/{ID} (delete)
Public: Não
Tipo: DELETE
Request: { "id": INTEGER }
Return Fail: { "message" : STRING }

TELEFONES
URI usada: /api/v1/telefones/store (store)
Public: Não
Tipo: POST
Request: { "cliente_id": INTEGER, "numero": STRING }
Return Success: { "telefone" : OBJECT }
Return Fail: { "error" : STRING }

URI usada: /api/v1/telefones/update/{ID} (update)
Public: Não
Tipo: PUT
Request: { "cliente_id": INTEGER, "numero": STRING }
Return Success: { "telefone" : OBJECT }
Return Fail: { "error" : STRING }

URI usada: /api/v1/telefones/delete/{ID} (delete)
Public: Não
Tipo: DELETE
Request: { "id": INTEGER }
Return Fail: { "message" : STRING }
########################################################################

USUÁRIOS
URI usada: /api/v1/users/signup (signup)
Public: Não
Tipo: POST
Request: { "name": STRING, "email": STRING, "login": STRING; "password": STRING  }
Return Success: { "user" : OBJECT }
Return Fail: { "error" : STRING }

CLIENTES
URI usada: /api/v1/clientes/ (index)
Public: NÃO
Tipo: GET
Return Success: { "cliente" : { OBJECT1, OBJECT2, OBJECT3} } 
Return Fail: { "error" : STRING }

URI usada: /api/v1/clientes/{ID} (show)
Public: NÃO
Tipo: GET
Return Success: { "cliente" : { OBJECT1, OBJECT2} }
Return Fail: { "error" : STRING }

URI usada: /api/v1/clientes/store (store)
Public: Não
Tipo: POST
Request: { "nome": STRING, "cpf": STRING }
Return Success: { "cliente" : OBJECT }
Return Fail: { "error" : STRING }

URI usada: /api/v1/clientes/update/{ID} (update)
Public: Não
Tipo: PUT
Request: { "nome": STRING, "cpf": STRING  }
Return Success: { "cliente" : OBJECT }
Return Fail: { "error" : STRING }

URI usada: /api/v1/clientes/delete/{ID} (delete)
Public: Não
Tipo: DELETE
Request: { "id": INTEGER }
Return Fail: { "message" : STRING }

PRODUTOS
URI usada: /api/v1/produtos (index)
Public: NÃO
Tipo: GET
Return Success: { "produto" : OBJECT }
Return Fail: { "error" : STRING }

URI usada: /api/v1/produtos/{ID} (show)
Public: NÃO
Tipo: GET
Return Success: { "produto" : OBJECT }
Return Fail: { "error" : STRING }

URI usada: /api/v1/produtos/store (store)
Public: Não
Tipo: POST
Request: { "isbn": INTEGER, "nome": STRING, "autor": STRING, "editora": STRING,  "preco": DECIMAL  }
Return Success: { "produto" : OBJECT }
Return Fail: { "error" : STRING }

URI usada: /api/v1/produtos/update/{ID} (update)
Public: Não
Tipo: PUT
Request: { "isbn": INTEGER, "nome": STRING, "autor": STRING, "editora": STRING,  "preco": DECIMAL  }
Return Success: { "produto" : OBJECT }
Return Fail: { "error" : STRING }

URI usada: /api/v1/produtos/delete/{ID} (delete)
Public: Não
Tipo: DELETE
Request: { "id": INTEGER }
Return Fail: { "message" : STRING }

VENDAS
URI usada: /api/v1/vendas/store (store)
Public: Não
Tipo: POST
Request: { "cliente_id": INTEGER, "produto_id": INTEGER, "quantidade": INTEGER, "preco_unitario": DECIMAL, “preco_total”: DECIMAL }
Return Success: { "venda" : OBJECT }
Return Fail: { "message" : STRING }

Entrega do código:
O que foi implementado:
As atividades listadas e apontadas no detalhamento do projeto, desenvolvida API RestFull na tecnologia definida;
Tecnologia:  PHP + Framework Laravel;
Dados simulados: utilizado o Postman para simular os dados e testar as funcionalidades;
Entrega funcional: gerado um entregável funcional e facilmente testável (vide instruções no fim deste documento);
Código-fonte: foi realizado o commit no repositório GIT indicado e posteriormente realizado o PULL REQUEST.

O que não foi implementado:
No endpoint “SHOW” da rota CLIENTES: 
o segundo objeto retornado (array com as vendas) não possibilita
trazer as vendas mais recentes primeiro que seria um ORDER BY DESC, o mesmo retorna ORDER BY ASC;
Possibilidade de filtrar as vendas por mês + ano.

TECH STACK E DEPENDÊNCIAS:
PHP 7.4.3;
MySQL 8.0.26-0ubuntu 0.20.04.2 - (Ubuntu);
Apache/2.4.41 (Ubuntu);
VSCodium 1.64.2;
Postman 8.11.1;
Composer 2.1.3;
Laravel 8.83.9;
JWT-AUTH 1.0.2 (Tokem para autenticação do Usuário);

PARA EXECUTAR O PROJETO LARAVEL (BE MOBILE BACKEND-TEST):

Clonar o projeto do GitHub;

Entrar na pasta do projeto via Terminal/Shell (Ex.: cd /var/www/html/NomeDoProjeto);

composer update (Executar este comando para atualizar as dependências do projeto); 

php artisan key:generate (Executar este comando para gerar a chave);

Criar o banco de dados MySQL;

cp .env.example .env
nano .env
Criar o arquivo .env com as informações do BD criado;

php artisan migrate (Executar este comando dentro da pasta do projeto para rodar as Migrations); 

php artisan jwt:secret (Executar este comando dentro da pasta do projeto para criar a chave do JWT);

php artisan tinker (Executar este comando dentro da pasta do projeto para entrar no tinker);

App\Models\User::create([name => 'teste', email => 'teste@teste', login => 'teste', password => bcrypt(123456)]); (Dentro do tinker, executar este comando para criar um usuário para testar a api);

php artisan serve (Executar este comando  rodar a aplicação);

Abrir o Postman para testar os endpoints da api.