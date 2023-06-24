const CourseVideo = require('./CourseVideo')
const Users = require('./Users')

module.exports = (Sequelize, DataTypes) => {
    const CourseWatched = Sequelize.define('CourseWatched', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            field: 'user_id',
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Users,
                key: 'id'
            },
        },
        courseVideoId: {
            field: 'course_video_id',
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: CourseVideo,
                key: 'id'
            },
        },
        watchingDuration: {
            field: 'watching_duration',
            type: DataTypes.TIME,
            allowNull: true
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
        tableName: 'course_watched',
        timestamps: true
    });

    CourseWatched.associate = (models) => {

    };

    return CourseWatched
}