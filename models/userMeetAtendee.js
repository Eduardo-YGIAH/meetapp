'use strict';
module.exports = (sequelize, DataTypes) => {
  const userMeetAtendee = sequelize.define(
    'MeetAtendee',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      isConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {},
  );
  return userMeetAtendee;
};
