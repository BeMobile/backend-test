const sql = require("../db").getConnection();

// constructor
const Produto = function (produto) {
    this.id = produto.id;
    this.cod_produto = produto.cod_produto;
    this.titulo = produto.titulo;
    this.subtitulo = produto.subtitulo;
    this.autor = produto.autor;
    this.editora = produto.editora;
    this.edicao = produto.edicao;
    this.ano_edicao = produto.ano_edicao;
    this.estado = produto.estado;
    this.cidade = produto.cidade;
    this.preco = produto.preco;
    this.ativo = produto.ativo;
};


Produto.create = (produto, result) => {
    sql.then(function (conn) {
        try {
            const query = "INSERT INTO produtos (`cod_produto`, `titulo`, `sub_titulo`, `autor`, `editora`, `edicao`, `ano_edicao`,  `preco`,  `ativo`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
            conn.query(query, [produto.cod_produto, produto.titulo, produto.subtitulo, produto.autor,
            produto.editora, produto.edicao, produto.ano_edicao, produto.preco, produto.ativo], function (err, res) {
                if (err) {
                    if (err.errno === 1062) {
                        var msg = err.sqlMessage;
                        var msg = msg.split(" ");

                        result(null, {
                            erro: err.errno,
                            message: msg[5] + ": " + msg[2] + " já existe no sistema."
                        });
                        return;
                    } else {
                        result(null, err);
                        return;
                    }

                }
                result(null, { insertId: res.insertId, message: "Produto cadastrado com sucesso!", ...produto });
            });
        } catch (err) {
            throw err;
        }
    })
};

Produto.index = (result) => {
    sql.then(function (conn) {
        try {
            const query = "SELECT cod_produto, titulo, autor, editora , preco, "
                + " CASE  WHEN ativo = 0 THEN 'Indisponivel' WHEN ativo = 1 THEN 'Disponivel'   END as situacao FROM produtos order by titulo";
            conn.query(query, function (err, res) {
                if (err) {
                    result(null, err);
                    return;
                }
                if (res.length > 0) {
                    result(null, { res });
                } else {
                    return result({ kind: "Não existem produtos cadastrados!!" }, null);
                }

            });

        } catch (err) {
            throw err;
        }
    })
};

Produto.show = (id, result) => {
    sql.then(function (conn) {
        try {
            const query = "SELECT cod_produto, titulo,sub_titulo, autor,editora,edicao, ano_edicao, preco,  CASE  WHEN ativo = 0 THEN 'Indisponivel' WHEN ativo = 1 THEN 'Disponivel'   END as situacao, CASE  WHEN ativo = 0 THEN DATE_FORMAT(deleted_at, '%d-%m-%Y %T') WHEN ativo = 1 THEN ''   END as data_deletado FROM produtos where id = ?";
            conn.query(query, id, function (err, res) {
                if (err) {
                    result(null, err);
                    return;
                }
                if (res.length > 0) {
                    result(null, { res });
                } else {
                    return result({ kind: "Produto não encontrado!!" }, null);
                }

            });

        } catch (err) {
            throw err;
        }
    })
};

Produto.update = (id, produto, result) => {
    sql.then(function (conn) {
        try {
            var itens = [];
            var conteudo = [];
            Object.keys(produto).forEach(function (item) {
                itens.push("`" + item + "` = ? ");
                conteudo.push(produto[item]);
            });
            var campos = itens.toString();

            const query = "UPDATE produtos SET " + campos + " WHERE id = ?";

            conn.query(query, [...conteudo, id], function (err, res) {
                if (err) {
                    if (err.errno === 1062) {
                        var msg = err.sqlMessage;
                        var msg = msg.split(" ");

                        result(null, {
                            erro: err.errno,
                            message: msg[5] + ": " + msg[2] + " já existe no sistema."
                        });
                        return;
                    } else {
                        result(null, err);
                        return;
                    }

                }
                if (res.affectedRows == 0) {
                    result({ kind: "Produto não encontrado" }, null);
                    return;
                } else {
                    result(null, { id: id, message: "Produto alterado com sucesso!", ...produto });
                    return;
                }
            });

        } catch (err) {
            throw err;
        }
    })
};

Produto.delete = (id, result) => {

    sql.then(function (conn) {
        try {
            const query = "UPDATE produtos SET `ativo`= 0, `deleted_at`= NOW() WHERE id = ?";
            conn.query(query, id, function (err, res) {
                if (err) {
                    result(null, err);
                    return;
                }
                if (res.affectedRows == 0) {
                    result({ kind: "Produto não encontrado" }, null);
                    return;
                }
                result(null, res);
            });
        } catch (err) {
            throw err;
        }
    })
};

module.exports = Produto;

