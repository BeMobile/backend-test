const sql = require("../db").getConnection();

// constructor
const Venda = function (venda) {
    this.id = venda.id;
    this.id_cliente = venda.id_cliente;
    this.id_produto = venda.id_produto;
    this.quantidade = venda.quantidade;
    this.preco_unit = venda.preco_unit;
};


Venda.create = (venda, result) => {
    sql.then(function (conn) {
        try {
            const total = venda.quantidade * venda.preco_unit;
            const query = "INSERT INTO vendas (`id_cliente`, `id_produto`,`quantidade`,`preco_unit`, `preco_total`,`data`, `hora`) VALUES (?, ?, ?, ?, ?, NOw(), NOW());";
            conn.query(query, [venda.id_cliente, venda.id_produto, venda.quantidade, venda.preco_unit, total], function (err, res) {

                if (err) {

                    if (err.errno === 1452) {
                        var msg = err.sqlMessage;
                        var msg = msg.split(" ");

                        result(null, {
                            erro: err.errno,
                            message: "Não existe esse item na tabela " + msg[19],
                            sqlMessage: err.sqlMessage
                        });
                        return;
                    } else {
                        result(null, err);
                        return;
                    }

                }
                result(null, { insertId: res.insertId, message: "Venda cadastrada com sucesso!", ...venda, valor_total: total });
            });
        } catch (err) {
            throw err;
        }
    })
};


module.exports = Venda;

