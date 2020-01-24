'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const images = [
      'https://res.cloudinary.com/ygiah/image/upload/v1579778771/Meets/Interior_Designer_bkg_desk_1x-min.jpg',
      'https://res.cloudinary.com/ygiah/image/upload/v1579778713/Meets/Babysitter_bkg_desk_1x-min.jpg',
      'https://res.cloudinary.com/ygiah/image/upload/v1579778628/Meets/Tutors_bkg_desk_1x-min.jpg',
      'https://res.cloudinary.com/ygiah/image/upload/v1579778573/Meets/Coaching_bkg_desk_1x-min.jpg',
      'https://res.cloudinary.com/ygiah/image/upload/v1579778466/Meets/Categories_bkg_desk_1x-min.jpg',
      'https://res.cloudinary.com/ygiah/image/upload/v1579778307/Meets/christmas_party-min.jpg',
      'https://res.cloudinary.com/ygiah/image/upload/v1579778263/Meets/hen_do_party-min.jpg',
      'https://res.cloudinary.com/ygiah/image/upload/v1579778262/Meets/jam_session-min.jpg',
    ];

    let date = new Date();

    let data = images.map(image => {
      return {
        title: faker.random.words(3),
        date: faker.date.future(),
        time: faker.date.future(),
        description: faker.random.words(10),
        limit_of_attendees: faker.random.number(30),
        first_line_address: faker.random.words(2),
        second_line_address: faker.random.words(2),
        post_code: faker.random.words(2),
        image_url: image,
        createdAt: date,
        updatedAt: date,
        organizerId: 12,
        locationId: 1130,
      };
    });

    return queryInterface.bulkInsert('Meets', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Meets', null, {});
  },
};
