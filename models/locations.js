"use strict";
module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.define(
    "Locations",
    {
      town: DataTypes.STRING,
      county: DataTypes.STRING,
      country: DataTypes.STRING
    },
    { timestamps: false }
  );
  Locations.associate = function(models) {
    // associations can be defined here
  };
  return Locations;
};
