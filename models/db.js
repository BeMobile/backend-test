const Sequelize = require('sequelize');

const sequelize = new Sequelize("bemobile", "root", "1234" ,{
    //arquivo de conexão com o banco
    host: "localhost",
    dialect: "mysql",
    port: 3307
} ); 

sequelize.authenticate() //checagem da conexão 
.then(() =>{
    console.log("Conexão realizada com sucesso !");

}).catch(() =>{
    console.log("Erro na conexão com o Banco de dados");
}) ;
    
module.exports = sequelize ; //tenho que exportar para funcionar pro projeto td