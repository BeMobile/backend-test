module.exports = (connection, Sequelize) =>
{
	const Produto = connection.define(
	'produto',
		{
			nome:
			{
				type: Sequelize.STRING
			},

			preco:
			{
				type: Sequelize.DOUBLE
			},

			autor:
			{
				type: Sequelize.STRING
			},

			editora:
			{
				type: Sequelize.STRING
			},
		}
	)

	return Produto
}
