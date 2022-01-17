module.exports = (connection, Sequelize) =>
{
    const Usuario = connection.define(
    'usuario',
        {
            id:
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },

            email:
            {
                type: Sequelize.STRING
            },

            senha:
            {
                type: Sequelize.STRING
            }
        }
    )

    return Usuario
}
