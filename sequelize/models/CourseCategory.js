const Course = require('./Course')
const Category = require('./Category')

module.exports = (Sequelize, DataTypes) => {
    const CourseCategory = Sequelize.define('CourseCategory', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
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
        categoryId: {
            field: 'category_id',
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Category,
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
        tableName: 'course_category',
        timestamps: true
    });

    CourseCategory.associate = (models) => {

    };

    return CourseCategory
}