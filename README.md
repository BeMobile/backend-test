# BEMOBILE INTERVIWER

 <hr />
 <p>
   Uma aplicação de cadastro de Produto
 </p>
  <hr />
 <h1> <hr />
    TECHS
 </h1>
 <ul>
   <li>Adonisjs 5</li>
   <li>Mysql</li>
   <li>JSON</li>
   <li>Lucid</li>
   <li>Node.js >=v14 
 </ul>
 <hr />
 <h1>
   DESIGN PATTERN
 </h1>
 <ul>
   <li>MVC</li>
 </ul>

 <hr />
 <h1>
    INSTALAÇÃO
 </h1>
 <hr />

 <ul>
   <li>Criar uma Base de dado sql : 
      <ul>
       <li>Uma tabela com nome <strong>bemobile</strong></li>   
       <li>Outras configurações estam no arquivo <strong>.ENV.exemple</strong> </li>  
      <ul>
   </li>
   <li>executar: yarn ou npm install</li>
   <li>executar migration: node ace migration:run</li>
   <li>executar a aplicação: node ace serve --watch</li>

 </ul>

  <hr />
 <h1>
    Rotas da aplicação
 </h1>
 <ul>
   <li>
     USUARIO: http://localhost/user --> POST
   </li>
   <li>
      USUARIO: http://localhost/user --> GET
    </li>
      <li>
      USUARIO: http://localhost/login --> POST
    </li>
     <li>
      CLIENTE: http://localhost/cliente --> POST
    </li>
     <li>
      CLIENTE: http://localhost/cliente --> GET
    </li>
     <li>
      CLIENTE: http://localhost/cliente/2 --> PUT
    </li>
     <li>
      CLIENTE: http://localhost/cliente/2 --> DELETE
    </li>
    <li>
       CLIENTE: http://localhost:3333/cliente/vendas/1 --> POST
    </li>
    <li>
       PRODRUTO: http://localhost:3333/produto --> POST
    </li>
      <li>
       PRODRUTO: http://localhost:3333/produto/1 --> PUT
    </li>
      <li>
       PRODRUTO: http://localhost:3333/produto/1 DELETE
    </li>
      <li>
       PRODRUTO: http://localhost:3333/produto --> GET
    </li>
    <li>
       PRODRUTO: http://localhost:3333/produto/2 --> GET
    </li>
     <li>
       VENDAS: http://localhost:3333/venda/2/2 --> POST
    </li>
    <pre>
        OBS: 
             -primeiro parámetro: id do cliente
             -segundo parámetro: id do produto
    </pre>
     <li>
       VENDAS: http://localhost:3333/venda --> GET
    </li>
    <li>
       TELEFONE: http://localhost:3333/telefone --> POST
    </li>
     <li>
       TELEFONE: http://localhost:3333/telefone --> GET
    </li>
    <li>
       ENDEREÇO: http://localhost:3333/endereco --> POST
    </li>
     <li>
       ENDEREÇO: http://localhost:3333/endereco --> GET
    </li>

 </ul>

   <hr />
 <h1>Dificuldades: </h1>
      <ul>
         <li>Erro ao configurar sql:
             <pre>
                ER_NOT_SUPPORTED_AUTH_MODE:
                   Client does not support authentication protocol requested by server; consider upgrading MySQL client
             </pre>
         </li>
      </ul>
   LINK DA SOLUÇÃO DO PROBLEMA: https://github.com/adonisjs/core/discussions/2941 


 <hr />
