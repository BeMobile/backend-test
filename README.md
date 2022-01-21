# Be mobile - Teste Back-end
Este repositório tem por objetivo entregar o desafio de back-end proposto pela Be Mobile. O desafio foi feito utilizando Node.JS, MySQL e Express.

## Tecnologias
- Node.JS
- MySQL
- Sequelize
- Express
- JWT

## Requisitos
- Node.JS em LTS;
- MySQL

## Instalação
1. Instale o projeto pelo `git clone`; 
2. Configure as informações da Database e do JWT no arquivo .env.example;
3. Renomeie o arquivo .env.example para `.env`;
4. Rode o comando  `npm init -y`;

Para rodar a aplicação, utilize `npm start`.

## Endpoints
##### GET
`/clientes`  
`/clientes/:id`

`/produtos`   
`/produtos/:id` 
##### POST
`/signup`  
`/login`  
`/clientes`   
`/produtos`  
`/vendas`     
##### PUT
`/clientes/:id`  
`/produtos/:id`

##### DELETE
`/clientes/:id`  
`/produtos/:id`
## Dificuldades
- Definição de chaves estrangeiras (Resolvida pela documentação do Sequelize)
- Realizar todas as verificações necessárias (Não consegui realizar todas as verificações necessárias em algumas rotas)
- Filtrar as vendas por mês + ano (Não consegui fazer)