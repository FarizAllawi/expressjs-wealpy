const CourseSection = require('./CourseSection')

module.exports = (Sequelize, DataTypes) => {
    const CourseVideo = Sequelize.define('CourseVideo', {
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
            allowNull: false
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        accessType: {
            field: 'access_type',
            type: DataTypes.ENUM,
            values: ['public', 'membership'],
            allowNull: false
        },
        sectionId: {
            field: 'section_id',
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: CourseSection,
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
        tableName: 'course_video',
        timestamps: true
    });

    CourseVideo.associate = (models) => {

    };

    return CourseVideo
}