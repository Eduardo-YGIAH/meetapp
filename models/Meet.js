'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meet = sequelize.define(
    'Meet',
    {
      title: DataTypes.STRING,
      date: DataTypes.DATE,
      time: DataTypes.TIME,
      description: DataTypes.STRING(1200),
      limit_of_attendees: DataTypes.INTEGER,
      first_line_address: DataTypes.STRING,
      second_line_address: DataTypes.STRING,
      post_code: DataTypes.STRING,
      image_url: DataTypes.STRING,
    },
    {},
  );
  Meet.associate = function(models) {
    Meet.belongsTo(models.Location, { targetKey: 'id', foreignKey: 'meetLocationId' });
    Meet.belongsToMany(models.User, {
      through: 'UserMeetAtendee',
      sourceKey: 'id',
      targetKey: 'id',
    });
    Meet.belongsTo(models.User, { targetKey: 'id', foreignKey: 'meetUserOrganizerId' });
  };
  return Meet;
};
