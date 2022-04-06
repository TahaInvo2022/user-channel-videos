'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sample_datas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      addressOne: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      east: {
        type: Sequelize.STRING
      },
      west: {
        type: Sequelize.STRING
      },
      north: {
        type: Sequelize.STRING
      },
      south: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING
      },
      shopName: {
        type: Sequelize.STRING
      },
      discount: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SampleData');
  }
};