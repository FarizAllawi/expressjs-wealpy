module.exports = (Sequelize, DataTypes) => {
  const PersonalAccessToken = Sequelize.define('PersonalAccessToken', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    tokenableType: {
      field: 'tokenable_type',
      type: DataTypes.STRING,
      allowNull: false,
    },
    tokenableId: {
      field: 'tokenable_id',
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    abilities: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    lastUsedAt: {
      field: 'last_used_at',
      type: DataTypes.DATE,
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
  },{
    tableName: 'personal_access_tokens',
    timestamps: true
  })

  PersonalAccessToken.associate = (models) => {

  };

  return PersonalAccessToken
}