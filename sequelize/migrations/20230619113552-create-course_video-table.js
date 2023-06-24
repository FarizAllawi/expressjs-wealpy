'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('course_video', {
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
      time: {
        type: Sequelize.DataTypes.TIME,
        allowNull: false
      },
      content: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
      },
      accessType: {
        field: 'access_type',
        type: Sequelize.DataTypes.ENUM,
        values: ['public', 'membership'],
        allowNull: false
      },
      sectionId: {
        field: 'section_id',
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

    await queryInterface.addConstraint('course_video', {
      type: 'foreign key',
      name: 'fk_course_video_section_id',
      fields: ['section_id'],
      references: {
        table: 'course_section',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('course_video', 'fk_course_video_section_id');
    await queryInterface.dropTable('course_video');
  }
};
