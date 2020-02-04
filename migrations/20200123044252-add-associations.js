'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // User belongs to Location
    return queryInterface
      .addColumn(
        'Users', // name of Source model
        'userLocationId', // name of the key we're adding
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
        // User Has Many Meets
        return queryInterface.addColumn('Meets', 'meetUserOrganizerId', {
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
        // Meet belongs to Location
        return queryInterface.addColumn('Meets', 'meetLocationId', {
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

  down: queryInterface => {
    // remove User belongs to Location
    return queryInterface
      .removeColumn(
        'Users', // name of Source model
        'userLocationId', // key we want to remove
      )
      .then(() => {
        //remove User Has Many Meets
        return queryInterface.removeColumn('Meets', 'meetUserOrganizerId');
      })
      .then(() => {
        //remove Meet belongs to Location
        return queryInterface.removeColumn('Meets', 'meetLocationId');
      });
  },
};
