const sql = require("../db").getConnection();
const cripty = require("../../utils/bdCrypt");
const jwt = require('jsonwebtoken');
// constructor
const User = function (user) {
    this.id = user.id;
    this.nome = user.nome;
    this.email = user.email;
    this.senha = user.senha;
};


User.create = (user, result) => {
    sql.then(function (conn) {
        try {
            var conj = cripty.gerarSenha(user.senha);

            const query = "INSERT INTO usuarios (`nome`, `email`,`senha`, `salt`) VALUES (?, ?, ?, ?);";
            conn.query(query, [user.nome, user.email, conj.hash, conj.salt], function (err, res) {
                if (err) {
                    if (err.errno === 1062) {
                        result(null, {
                            erro: err.errno,
                            message: "O email " + user.email + " já existe no sistema."
                        });
                        return;
                    } else {
                        result(null, err);
                        return;
                    }

                }
                result(null, { insertId: res.insertId, message: "Usuario cadastrado com sucesso!", nome: user.nome, email: user.email });
            });
        } catch (err) {
            throw err;
        }
    })
};

User.getLogin = (user, result) => {
    sql.then(function (conn) {
        try {
            const query = "SELECT * FROM usuarios WHERE email = ?";
            conn.query(query, [user.email], function (err, res) {
                if (err) {
                    result(null, err);
                    return;
                }
                if (res.length) {

                    var conj = cripty.login(user.senha, res[0].salt, res[0].senha);

                    if (conj.login === true) {

                        const query = "SELECT * FROM usuarios WHERE email = ? and senha = ? ";
                        conn.query(query, [user.email, conj.hash], function (err, res) {
                            if (err) {
                                result(null, err);
                            }
                            if (res.length) {
                                const id = res[0].id;
                                const token = jwt.sign({ id }, process.env.SECRET, {
                                    expiresIn: 600 
                                });
                                result(null, { message: "Usuario Logado! ", auth: true, token: token, nome: res[0].nome, email: res[0].email });

                            }
                        });

                    } else {
                        return result({ kind: "Email e Senha não conferem!!" }, null);
                    }
                } else {
                    return result({ kind: "Email não cadastrado!!" }, null);
                }

            });

        } catch (err) {
            throw err;
        }
    })
};

module.exports = User;