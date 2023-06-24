const Users = require('./Users')

module.exports = (Sequelize, DataTypes) => {
    const Course = Sequelize.define('Course', {
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
        thumbnail: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        type: {
            type: DataTypes.ENUM,
            values: ['free', 'premium'],
            defaultValue: 'free',
            allowNull: false
        },
        level: {
            type: DataTypes.ENUM,
            values: ['all-level','basic', 'beginner','intermediate', 'advance', 'expert'],
            defaultValue: 'all-level',
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM,
            values: ['draft', 'published'],
            defaultValue: 'draft',
            allowNull: false
        },
        mentor: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Users,
                key: 'id'
            },
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: true,
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
        tableName: 'course',
        timestamps: true
    });

    Course.associate = (models) => {

    };

    return Course
}