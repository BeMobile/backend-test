const mysql = require("mysql");
const dbConfig = require("../config/db.config");


const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});
module.exports = {
  getConnection() {
    return new Promise(function (res, rej) {
      pool.getConnection(function(err, connection) {
        if (err){
          rej(err);
          throw err;
        } 
        res(connection);
      });
    });
  }
};
