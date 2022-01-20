const sql = require("../db").getConnection();

// constructor
const Endereco = function (end) {
    this.id = end.id;
    this.id_cliente = end.id_cliente;
    this.cep = end.cep;
    this.estado = end.estado;
    this.cidade = end.cidade;
    this.bairro = end.bairro;
    this.logradouro = end.logradouro;
    this.numero = end.numero;
    this.complemento = end.complemento;
};


Endereco.create = (end, result) => {
    sql.then(function (conn) {
        try {
            const query = "INSERT INTO endereco (`id_cliente`, `cep`,`estado`, `cidade`, `bairro`, `logradouro`,`numero`, `complemento`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
            conn.query(query, [end.id_cliente, end.cep, end.estado, end.cidade, end.bairro, end.logradouro, end.numero, end.complemento], function (err, res) {
                if (err) {
                    try {
                        const query1 = "DELETE FROM clientes WHERE id = ?";
                        conn.query(query1, end.id_cliente, function (err1, res1) {
                            if (err1) {
                                result(null, err1);
                                return;
                            }
                        });
                    } catch (err1) {
                        throw err1;
                    }

                    if (err.errno === 1406) {
                        var msg = err.sqlMessage;
                        var msg = msg.split(" ");

                        result(null, {
                            erro: err.errno,
                            message: "Conteudo muito longo para a coluna " + msg[5],
                            sqlMessage: err.sqlMessage
                        });
                        return;
                    } else if (err.errno === 1366) {
                        var msg = err.sqlMessage;
                        var msg = msg.split(" ");

                        result(null, {
                            erro: err.errno,
                            message: "O campo " + msg[6] + " só aceita valores do tipo " + msg[1],
                            sqlMessage: err.sqlMessage
                        });
                        return;
                    } else if (err.errno === 1265) {
                        var msg = err.sqlMessage;
                        var msg = msg.split(" ");

                        result(null, {
                            erro: err.errno,
                            message: "O campo " + msg[4] + " só aceita valores do tipo inteiro",
                            sqlMessage: err.sqlMessage
                        });
                        return;
                    } else {
                        result(null, err);
                        return;
                    }
                }
                result(null, { insertId: res.insertId, message: "Endereco cadastrado com sucesso!", ...end });
            });
        } catch (err) {
            throw err;
        }
    })
};



Endereco.update = (id, end, result) => {
    sql.then(function (conn) {
        try {

            var itens = [];
            var conteudo = [];
            Object.keys(end).forEach(function (item) {
                itens.push("`" + item + "` = ? ");
                conteudo.push(end[item]);
            });
            var campos = itens.toString();

            const query = "UPDATE endereco SET " + campos + " WHERE id = ?";

            conn.query(query, [...conteudo, id], function (err, res) {
                if (err) {
                    if (err.errno === 1406) {
                        var msg = err.sqlMessage;
                        var msg = msg.split(" ");

                        result(null, {
                            erro: err.errno,
                            message: "Conteudo muito longo para a coluna " + msg[5],
                            sqlMessage: err.sqlMessage
                        });
                        return;
                    } else if (err.errno === 1366) {
                        var msg = err.sqlMessage;
                        var msg = msg.split(" ");

                        result(null, {
                            erro: err.errno,
                            message: "O campo " + msg[6] + " só aceita valores do tipo " + msg[1],
                            sqlMessage: err.sqlMessage
                        });
                        return;
                    } else if (err.errno === 1265) {
                        var msg = err.sqlMessage;
                        var msg = msg.split(" ");

                        result(null, {
                            erro: err.errno,
                            message: "O campo " + msg[4] + " só aceita valores do tipo inteiro",
                            sqlMessage: err.sqlMessage
                        });
                        return;
                    } else {
                        result(null, err);
                        return;
                    }
                }
                if (res.affectedRows == 0) {
                    result({ kind: "Endereco não encontrado" }, null);
                    return;
                }

                result(null, { id: id, message: "Endereco alterado com sucesso!", ...end });
            });

        } catch (err) {
            throw err;
        }
    })
};


module.exports = Endereco;

