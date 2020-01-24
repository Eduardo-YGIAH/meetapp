"use strict";
module.exports = (sequelize, DataTypes) => {
  const Meet = sequelize.define(
    "Meet",
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING
    },
    {}
  );
  Meet.associate = function() {
    // Meet.hasMany(models.User, { foreignKey: "id" });
  };
  return Meet;
};
