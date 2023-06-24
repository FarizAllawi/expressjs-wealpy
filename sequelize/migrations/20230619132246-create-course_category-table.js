'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('course_category', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      courseId: {
        field: 'course_id',
        type: Sequelize.DataTypes.UUID,
        allowNull: false
      },
      categoryId: {
        field: 'category_id',
        type: Sequelize.DataTypes.UUID,
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

    await queryInterface.addConstraint('course_category', {
      type: 'foreign key',
      name: 'fk_course_category_course_id',
      fields: ['course_id'],
      references: {
        table: 'course',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('course_category', {
      type: 'foreign key',
      name: 'fk_course_category_category_id',
      fields: ['category_id'],
      references: {
        table: 'category',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('course_category', 'fk_course_category_course_id');
    await queryInterface.removeConstraint('course_category', 'fk_course_category_category_id');
    await queryInterface.dropTable('course_category');
  }
};
