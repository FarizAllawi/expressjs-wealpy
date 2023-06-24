'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: true
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      proffesion: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      telegram: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      instagram: {
        type: Sequelize.DataTypes.STRING,
        allowNull:true
      },
      tiktok: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      phone: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      photo: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      startDateMembership: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true
      },
      dueDateMembership: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
