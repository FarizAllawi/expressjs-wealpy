'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('media', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      userId: {
        field: 'user_id',
        type: Sequelize.DataTypes.UUID,
        allowNull: false
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      fileType: {
        field: 'file_type',
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      filePath: {
        field: 'file_path',
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
      },
      fileSize: {
        field: 'file_size',
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false
      },
      url: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
      },
      accessType: {
        field: 'access_type',
        type: Sequelize.DataTypes.ENUM,
        values: ['public', 'private'],
        allowNull: false
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

    await queryInterface.addConstraint('media', {
      type: 'foreign key',
      name: 'fk_media_user_id',
      fields: ['user_id'],
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('media', 'fk_media_user_id');
    await queryInterface.dropTable('media');
  }
};
