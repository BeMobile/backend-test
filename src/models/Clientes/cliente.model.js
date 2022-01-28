const cli = require("nodemon/lib/cli");

const sql = require("../db").getConnection();

// constructor
const Cliente = function (cliente) {
    this.id = cliente.id;
    this.nome = cliente.nome;
    this.cpf = cliente.cpf;
    this.genero = cliente.genero;
    this.data_nascimento = cliente.data_nascimento;
};


Cliente.create = (cliente, result) => {
    sql.then(function (conn) {
        try {
            const query = "INSERT INTO clientes (`nome`, `cpf`,`genero`, `data_nascimento`) VALUES (?, ?, ?, ?);";
            conn.query(query, [cliente.nome, cliente.cpf, cliente.genero, cliente.data_nascimento], function (err, res) {
                if (err) {
                    if (err.errno === 1062) {
                        var msg = err.sqlMessage;
                        var msg = msg.split(" ");

                        result({
                            erro: err.errno,
                            message: msg[5] + ": " + msg[2] + " já existe no sistema.",
                            sqlMessage: err.sqlMessage
                        }, null);
                        return;
                    } else if (err.errno === 1292) {
                        result({
                            erro: err.errno,
                            message: "A data de nascimento precisa ser no formato Ano/Mes/Dia ",
                            sqlMessage: err.sqlMessage
                        }, null);
                        return;
                    } else {
                        result(err, null);
                        return;
                    }

                }

                result(null, { idInsert: res.insertId, message: "Cliente cadastrado com sucesso!", ...cliente });
            });
        } catch (err) {
            result(err, null);
            return;
        }
    })
};

Cliente.index = (result) => {
    sql.then(function (conn) {
        try {
            const query = "SELECT nome, cpf, genero, DATE_FORMAT(data_nascimento, '%d-%m-%Y') as data_nascimento FROM clientes order by id";
            conn.query(query, function (err, res) {
                if (err) {
                    result(err, null);
                    return;
                }
                if (res.length > 0) {
                    result(null, { res });
                } else {
                    return result({ message: "Não existem clientes cadastrados!!" }, null);
                }

            });

        } catch (err) {
            result(err, null);
            return;
        }
    })
};

Cliente.show = (id, venda, result) => {
    sql.then(function (conn) {
        try {

            const query = "SELECT nome,cpf,genero, DATE_FORMAT(data_nascimento, '%d-%m-%Y') as data_nascimento FROM clientes WHERE id= ? ";
            conn.query(query, id, function (err, res) {
                if (err) {
                    result(err, null);
                    return;
                }
                if (res.length > 0) {

                    var ano = '';
                    var mes = '';
                    if (venda.ano !== undefined && venda.ano !== '') {
                        ano = venda.ano;
                    }
                    if (venda.mes !== undefined && venda.mes !== '') {
                        mes = '-' + venda.mes;
                    }
                    const data = '%' + ano + mes + '%';


                    var query = "SELECT p.cod_produto,p.titulo, v.quantidade,v.preco_unit, v.preco_total, DATE_FORMAT(v.data, '%d-%m-%Y') as data, v.hora FROM clientes c "
                        + "inner JOIN vendas v ON c.id=v.id_cliente "
                        + "inner JOIN produtos p ON p.id=v.id_produto "
                        + "WHERE c.id= ? and v.data like ? ORDER BY v.data, v.hora";

                    conn.query(query, [id, data], function (err1, res1) {

                        if (err1) {
                            result(err1, null);
                            return;
                        }
                        if (res1.length > 0) {

                            result(null, { cliente: res, produtos: res1 });

                        } else {
                            return result({ message: "Cliente não possui compras!!" }, null);
                        }

                    });

                } else {
                    return result({ message: "Cliente não encontrado!!" }, null);
                }

            });


        } catch (err) {
            result(err, null);
            return;
        }
    })
};

Cliente.update = (id, cliente, result) => {
    sql.then(function (conn) {
        try {
            var itens = [];
            var conteudo = [];
            Object.keys(cliente).forEach(function (item) {
                itens.push("`" + item + "` = ? ");
                conteudo.push(cliente[item]);
            });
            var campos = itens.toString();

            const query = "UPDATE clientes SET " + campos + " WHERE id = ?";
            conn.query(query, [...conteudo, id], function (err, res) {
                if (err) {
                    if (err.errno === 1062) {
                        var msg = err.sqlMessage;
                        var msg = msg.split(" ");

                        result({
                            erro: err.errno,
                            message: msg[5] + ": " + msg[2] + " já existe no sistema.",
                            sqlMessage: err.sqlMessage
                        }, null);
                        return;
                    } else if (err.errno === 1292) {
                        result({
                            erro: err.errno,
                            message: "A data de nascimento precisa ser no formato Ano/Mes/Dia ",
                            sqlMessage: err.sqlMessage
                        }, null);
                        return;
                    } else {
                        result(err, null);
                        return;
                    }
                }
                if (res.affectedRows == 0) {
                    result({ message: "Cliente não encontrado" }, null);
                    return;
                }

                result(null, { id: id, message: "Cliente alterado com sucesso!!!", ...cliente });
            });

        } catch (err) {
            result(err, null);
            return;
        }
    })
};

Cliente.delete = (id, result) => {

    sql.then(function (conn) {
        try {

            const query = "DELETE FROM clientes WHERE id = ?";
            conn.query(query, id, function (err, res) {
                if (err) {
                    result(err, null);
                    return;
                }
                if (res.affectedRows == 0) {
                    result({ message: "Cliente não encontrado" }, null);
                    return;
                }
                result(null, res);
            });
        } catch (err) {
            result(err, null);
            return;
        }
    })
};

module.exports = Cliente;

