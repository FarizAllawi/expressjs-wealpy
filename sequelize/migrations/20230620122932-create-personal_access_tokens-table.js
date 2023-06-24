'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('personal_access_tokens', {
      id: {
        type: Sequelize.Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      tokenableType: {
        field: 'tokenable_type',
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      tokenableId: {
        field: 'tokenable_id',
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      abilities: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      lastUsedAt: {
        field: 'last_used_at',
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('personal_access_tokens');
  }
};
