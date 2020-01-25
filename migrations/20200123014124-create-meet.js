"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Meets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      time: {
        type: Sequelize.TIME
      },
      description: {
        type: Sequelize.STRING
      },
      limit_of_attendees: {
        type: Sequelize.INTEGER
      },
      first_line_address: {
        type: Sequelize.STRING
      },
      second_line_address: {
        type: Sequelize.STRING
      },
      post_code: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable("Meets");
  }
};
