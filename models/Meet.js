'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meet = sequelize.define(
    'Meet',
    {
      title: DataTypes.STRING,
      date: DataTypes.DATE,
      time: DataTypes.TIME,
      description: DataTypes.STRING,
      limit_of_attendees: DataTypes.INTEGER,
      first_line_address: DataTypes.STRING,
      second_line_address: DataTypes.STRING,
      post_code: DataTypes.STRING,
      image_url: DataTypes.STRING,
    },
    {},
  );
  Meet.associate = function(models) {
    Meet.hasOne(models.User, {
      // foreignKey: 'organizerId',
    });
    Meet.hasOne(models.Location, {
      // foreignKey: 'locationId',
    });
    Meet.belongsToMany(models.User, { through: 'Bookings' });
  };
  return Meet;
};
