'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    'Location',
    {
      town: DataTypes.STRING,
      county: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {},
  );
  Location.associate = function(models) {};
  return Location;
};
