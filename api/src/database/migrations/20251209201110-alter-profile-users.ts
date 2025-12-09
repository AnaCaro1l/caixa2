import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.changeColumn('Users', 'profile', {
      type: DataTypes.INTEGER,
    })
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.changeColumn('Users', 'profile', {
      type: DataTypes.STRING,
    })
  }
};
