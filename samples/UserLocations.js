'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserLocation = sequelize.define(
    'UserLocations',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      LocationsId: {
        allowNull: false,
      },
    },
    {},
  );
  return UserLocation;
};
