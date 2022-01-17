module.exports = (connection, Sequelize) =>
{
    const Cliente = connection.define(
    'cliente',
        {
            id:
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },

            nome:
            {
                type: Sequelize.STRING
            },

            cpf:
            {
                type: Sequelize.STRING
            }
        }
    )

    return Cliente
}
