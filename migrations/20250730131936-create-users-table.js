'use strict';

const table = "users"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(table, {
       id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
         },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
         role: {
             type: Sequelize.ENUM('admin', 'user'),
             allowNull: false,
             defaultValue: 'user'
        },
        createdAt: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
      })
    },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(table)
  }
};
