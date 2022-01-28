const sql = require("../db").getConnection();

// constructor
const Contato = function (contato) {
    this.id = contato.id;
    this.id_cliente = contato.id_cliente;
    this.telefone = contato.telefone;
    this.email = contato.email;
};


Contato.create = (contato, result) => {
    sql.then(function (conn) {
        try {
            const query = "INSERT INTO contato (`id_cliente`, `telefone`,`email`) VALUES (?, ?, ?);";
            conn.query(query, [contato.id_cliente, contato.telefone, contato.email], function (err, res) {
                if (err) {

                    try {
                        const query1 = "DELETE FROM clientes WHERE id = ?";
                        conn.query(query1, contato.id_cliente, function (err1, res1) {
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
                result(null, { insertId: res.insertId, message: "Contato cadastrado com sucesso!", ...contato });
            });
        } catch (err) {
            throw err;
        }
    })
};


Contato.update = (id, contato, result) => {
    sql.then(function (conn) {
        try {
            var itens = [];
            var conteudo = [];
            Object.keys(cliente).forEach(function (item) {
                itens.push("`" + item + "` = ? ");
                conteudo.push(cliente[item]);
            });
            var campos = itens.toString();

            const query = "UPDATE contato SET " + campos + " WHERE id = ?";
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
                result(null, { id: id, message: "Contato alterado com sucesso!", ...contato });
            });

        } catch (err) {
            throw err;
        }
    })
};



module.exports = Contato;

