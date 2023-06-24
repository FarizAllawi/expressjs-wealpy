const Course = require('./Course')

module.exports = (Sequelize, DataTypes) => {
    const CourseSection = Sequelize.define('CourseSection', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        courseId: {
            field: 'course_id',
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Course,
                key: 'id'
            },
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            allowNull: false,
        }

    }, {
        tableName: 'course_section',
        timestamps: true
    });

    CourseSection.associate = (models) => {

    };

    return CourseSection
}