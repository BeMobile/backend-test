module.exports = (connection, Sequelize) =>
{
	const Venda = connection.define(
	'venda',
		{
			id:
			{
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
			}
		}
	)

	return Venda
}
