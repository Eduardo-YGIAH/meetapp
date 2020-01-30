'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    'Location',
    {
      town: DataTypes.STRING,
      county: DataTypes.STRING,
      country: DataTypes.STRING,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false },
  );
  Location.associate = function(models) {
    Location.hasMany(models.User, { sourceKey: 'id', foreignKey: 'userLocationId' });
    Location.hasMany(models.Meet, { sourceKey: 'id', foreignKey: 'meetLocationId' });
  };
  return Location;
};
