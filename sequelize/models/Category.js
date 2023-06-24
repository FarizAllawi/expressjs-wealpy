module.exports = (Sequelize, DataTypes) => {
    const Category = Sequelize.define('Category', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        parentCategory: {
            field: 'parent_category',
            type: DataTypes.UUID,
            allowNull: true,
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE
        }
    },{
        tableName: 'category',
        timestamps: true
    })

    Category.associate = (models) => {

    };

    return Category
}