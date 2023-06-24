const Users = require('./Users')

module.exports = (Sequelize, DataTypes) => {
    const Media = Sequelize.define('Media', {
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
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fileType: {
            field: 'file_type',
            type: DataTypes.STRING,
            allowNull: false
        },
        filePath: {
            field: 'file_path',
            type: DataTypes.TEXT,
            allowNull: false
        },
        fileSize: {
            field: 'file_size',
            type: DataTypes.BIGINT,
            allowNull: false
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        accessType: {
            field: 'access_type',
            type: DataTypes.ENUM,
            values: ['public', 'private'],
            allowNull: false
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
        tableName: 'media',
        timestamps: true
    });

    Media.associate = (models) => {

    };

    return Media
}