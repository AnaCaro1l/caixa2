import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('Users', 'cpf');
    await queryInterface.addColumn('Users', 'companyId', {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Companies',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('Users', 'companyId');
    await queryInterface.addColumn('Users', 'cpf', {
      type: DataTypes.STRING,
      allowNull: true,
    });
  },
};
