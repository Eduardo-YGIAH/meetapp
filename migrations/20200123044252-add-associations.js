'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // User has One Location
    return queryInterface
      .addColumn(
        'Users', // name of Source model
        'locationId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Locations', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
      )
      .then(() => {
        // Meet Has One Organizer
        return queryInterface.addColumn('Meets', 'organizerId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        });
      })
      .then(() => {
        // Meet Has One Location
        return queryInterface.addColumn('Meets', 'locationId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Locations', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    // remove User has One Location
    return queryInterface
      .removeColumn(
        'Users', // name of Source model
        'locationId', // key we want to remove
      )
      .then(() => {
        //remove Meet Has One Organizer
        return queryInterface.removeColumn('Meets', 'organizerId');
      })
      .then(() => {
        //remove Meet Has One Location
        return queryInterface.removeColumn('Meets', 'locationId');
      });
  },
};
