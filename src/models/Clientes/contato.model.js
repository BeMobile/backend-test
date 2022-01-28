const sql = require("../db").getConnection();

// constructor
const Contato = function (contatos) {
    this.id = contatos.id;
    this.id_cliente = contatos.id_cliente;
    this.telefone = contatos.telefone;
    this.email = contatos.email;
};


Contato.create = (contatos, result) => {
    sql.then(function (conn) {
        try {
            const query = "INSERT INTO contatos (`id_cliente`, `telefone`,`email`) VALUES (?, ?, ?);";
            conn.query(query, [contatos.id_cliente, contatos.telefone, contatos.email], function (err, res) {
                if (err) {

                    try {
                        const query1 = "DELETE FROM clientes WHERE id = ?";
                        conn.query(query1, contatos.id_cliente, function (err1, res1) {
                            if (err1) {
                                result(null, err1);
                                return;
                            }
                        });
                    } catch (err1) {
                        throw err1;
                    }

                    if (err.errno === 1062) {
                        var msg = err.sqlMessage;
                        var msg = msg.split(" ");
                        result(null, {
                            erro: err.errno,
                            message: msg[5] + ": " + msg[2] + " já existe no sistema.",
                            sqlMessage: err.sqlMessage
                        });
                        return;
                    } else {
                        result(null, err);
                        return;
                    }
                }
                result(null, { insertId: res.insertId, message: "Contato cadastrado com sucesso!", ...contatos });
            });
        } catch (err) {
            throw err;
        }
    })
};


Contato.update = (id, contatos, result) => {
    sql.then(function (conn) {
        try {
            var itens = [];
            var conteudo = [];
            Object.keys(cliente).forEach(function (item) {
                itens.push("`" + item + "` = ? ");
                conteudo.push(cliente[item]);
            });
            var campos = itens.toString();

            const query = "UPDATE contatos SET " + campos + " WHERE id = ?";
            conn.query(query, [...conteudo, id], function (err, res) {
                if (err) {

                    if (err.errno === 1062) {
                        var msg = err.sqlMessage;
                        var msg = msg.split(" ");
                        result(null, {
                            erro: err.errno,
                            message: msg[5] + ": " + msg[2] + " já existe no sistema.",
                            sqlMessage: err.sqlMessage
                        });
                        return;
                    } else {
                        result(null, err);
                        return;
                    }
                }
                if (res.affectedRows == 0) {
                    result({ kind: "Contato não encontrado" }, null);
                    return;
                }
                result(null, { id: id, message: "Contato alterado com sucesso!", ...contatos });
            });

        } catch (err) {
            throw err;
        }
    })
};



module.exports = Contato;

