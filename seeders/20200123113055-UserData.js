"use strict";

const faker = require("faker");

module.exports = {
  up: async queryInterface => {
    let data = [
      {
        image_url:
          "https://res.cloudinary.com/ygiah/image/upload/v1579778125/Avatars/image_11.jpg",
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
        locationId: 1130
      },
      {
        image_url:
          "https://res.cloudinary.com/ygiah/image/upload/v1579778124/Avatars/image_7.jpg",
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
        locationId: 1130
      },
      {
        image_url:
          "https://res.cloudinary.com/ygiah/image/upload/v1579778124/Avatars/image_6.jpg",
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
        locationId: 1130
      },
      {
        image_url:
          "https://res.cloudinary.com/ygiah/image/upload/v1579778124/Avatars/image_3.jpg",
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
        locationId: 1130
      },
      {
        image_url:
          "https://res.cloudinary.com/ygiah/image/upload/v1579778124/Avatars/image_5.jpg",
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
        locationId: 1130
      },
      {
        image_url:
          "https://res.cloudinary.com/ygiah/image/upload/v1579778123/Avatars/image_4.jpg",
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
        locationId: 1130
      },
      {
        image_url:
          "https://res.cloudinary.com/ygiah/image/upload/v1579778123/Avatars/image_1.jpg",
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
        locationId: 1130
      }
    ];

    return queryInterface.bulkInsert("Users", data, {});
  },

  down: async queryInterface => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
