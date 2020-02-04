'use strict';
module.exports = (sequelize, DataTypes) => {
  const MeetLocation = sequelize.define(
    'MeetLocations',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    },
    {},
  );
  return MeetLocation;
};
