'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('course', {
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
      slug: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      thumbnail: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
      },
      type: {
        type: Sequelize.DataTypes.ENUM,
        values: ['free', 'premium'],
        defaultValue: 'free',
        allowNull: false
      },
      level: {
        type: Sequelize.DataTypes.ENUM,
        values: ['all-level','basic', 'beginner','intermediate', 'advance', 'expert'],
        defaultValue: 'all-level',
        allowNull: false
      },
      status: {
        type: Sequelize.DataTypes.ENUM,
        values: ['draft', 'published'],
        defaultValue: 'draft',
        allowNull: false
      },
      mentor: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false
      },
      price: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: true,
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

    await queryInterface.addConstraint('course', {
      type: 'foreign key',
      name: 'fk_course_mentor',
      fields: ['mentor'],
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('course', 'fk_course_mentor');
    await queryInterface.dropTable('course');
  }
};
