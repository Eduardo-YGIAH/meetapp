'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    'Location',
    {
      town: DataTypes.STRING,
      county: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    { timestamps: false },
  );
  // Location.associate = function(models) {
  //   // associations can be defined here
  // };
  return Location;
};
