"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Locations", {
      town: {
        type: Sequelize.STRING
      },
      county: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable("Locations");
  }
};
