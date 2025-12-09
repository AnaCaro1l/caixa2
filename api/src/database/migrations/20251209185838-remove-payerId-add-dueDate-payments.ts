import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('Payments', 'payerId');
    await queryInterface.addColumn('Payments', 'dueDate', {
      type: DataTypes.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('Payments', 'paymentLink', {
      type: DataTypes.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Payments', 'companyId', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Companies',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.addColumn('Payments', 'payerId', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.removeColumn('Payments', 'dueDate');
    await queryInterface.removeColumn('Payments', 'paymentLink');
    await queryInterface.removeColumn('Payments', 'companyId');
  },
};
