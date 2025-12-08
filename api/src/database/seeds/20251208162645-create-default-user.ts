import { QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('Users', [{
      name: 'Administrador',
      email: 'admin@gmail.com',
      passwordHash: '$2b$10$GGCqmw0z317ogH8.44LYG.k6Ee3/rddjDVPh4jgxxmZJMB2dKVtWi',
      profile: 99,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Users', {});
  }
};
