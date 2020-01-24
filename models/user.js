"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING
    },
    {}
  );
  User.associate = function() {
    // User.hasMany(models.meet);
    // User.belongsTo(models.mmet);
  };
  return User;
};
