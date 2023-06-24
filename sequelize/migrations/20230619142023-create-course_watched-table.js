'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('course_watched', {
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
      courseVideoId: {
        field: 'course_video_id',
        type: Sequelize.DataTypes.UUID,
        allowNull: false
      },
      watchingDuration: {
        field: 'watching_duration',
        type: Sequelize.DataTypes.TIME,
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

    await queryInterface.addConstraint('course_watched', {
      type: 'foreign key',
      name: 'fk_course_watched_user_id',
      fields: ['user_id'],
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('course_watched', {
      type: 'foreign key',
      name: 'fk_course_watched_course_video_id',
      fields: ['course_video_id'],
      references: {
        table: 'course_video',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('course_watched', 'fk_course_watched_user_id');
    await queryInterface.removeConstraint('course_watched', 'fk_course_watched_course_video_id');
    await queryInterface.dropTable('course_watched');
  }
};
