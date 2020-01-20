"use strict";
module.exports = (sequelize, DataTypes) => {
  const Meet = sequelize.define(
    "Meet",
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {}
  );
  Meet.associate = function(models) {
    Meet.hasMany(models.user);
  };
  return Meet;
};
