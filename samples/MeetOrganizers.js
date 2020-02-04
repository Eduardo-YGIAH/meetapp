'use strict';
module.exports = (sequelize, DataTypes) => {
  const MeetOrganizer = sequelize.define(
    'MeetOrganizers',
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
  return MeetOrganizer;
};
