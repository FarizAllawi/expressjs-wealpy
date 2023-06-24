module.exports = (Sequelize, DataTypes) => {
    const Users = Sequelize.define('Users', {
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
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        proffesion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        telegram: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        instagram: {
            type: DataTypes.STRING,
            allowNull:true
        },
        tiktok: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        photo: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        startDateMembership: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        dueDateMembership: {
            type: DataTypes.BIGINT,
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
    },{
        tableName: 'users',
        timestamps: true
    })

    Users.associate = (models) => {

    };

    return Users
}