'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // User Belongs To Many Meets AND Meet Belongs To Many Users
    return queryInterface.createTable('UserMeetAtendee', {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      meetId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    });
  },

  down: queryInterface => {
    // remove table
    return queryInterface.dropTable('UserMeetAtendee');
  },
};
