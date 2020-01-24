const db = require('../models/index');
const passport = require('../config/passport');

module.exports = function(app) {
  // AUTHENTICATION

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post('/api/login', passport.authenticate('local'), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post('/api/signup', function(req, res) {
    db.User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    })
      .then(function() {
        res.redirect(307, '/api/login');
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // Route for getting some data about our user to be used client side
  // app.get('/api/user_data', function(req, res) {
  //   if (!req.user) {
  // The user is not logged in, send back an empty object
  //   res.json({});
  // } else {
  // Otherwise send back the user's email and id
  // Sending back a password, even a hashed password, isn't a good idea
  //     res.json({
  //       email: req.user.email,
  //       id: req.user.id,
  //     });
  //   }
  // });

  app.get('/api/locations', function(req, res) {
    db.Location.findAll({
      attributes: ['id', 'town'],
    })
      .then(locations => {
        res.json(
          locations.map(location => {
            return {
              ...location.dataValues,
            };
          }),
        );
      })
      .catch(error => {
        console.log(error);
        res.end();
      });
  });

  app.get('/api/search_location', function(req, res) {
    const town = req.body.search_location;
    console.log(town);

    // db.Meet.findAll({ include: [db.Location] }).then(function (data) {
    //     db.Location.findOne({
    //       where: {
    //         id:
    //       }
    //     })
    //     var meetsInLocation = data.filter(function (meet) {
    //         return meet.dataValues.locationId === false;
    //     })
    //     // gets all ice creams that are eaten
    //     var iceCreamEaten = data.filter(function (ice_cream) {
    //         return ice_cream.dataValues.devoured === true;
    //     })
    //     // sends back the list of eaten and not eaten icecreams to index.handlebars where the HTML is renderend
    res.render('landing', { town });
  });

  // app.get('/api/search_location', (req, res) => {
  //   const town = req.body.search_location;
  //   db.Meet.findAll(
  //     {
  //       attributes: ['id', 'title', 'date', 'time', 'image_url', 'description', 'locationId', 'organizerId'],
  //     },
  //     {
  //       where: {
  //         town: town,
  //       },
  //     },
  //   ).then(meets => {
  //     const meetsArray = meets
  //       .map(meet => {
  //         return {
  //           ...meet.dataValues,
  //         };
  //       })
  //       .map(meet => {
  //         let dateString;
  //         let dateFormated;
  //         let timeFormated = meet.time.substr(0, 5);
  //         dateString = meet.date.toString();
  //         dateFormated = dateString.substr(0, 16);

  //         return {
  //           ...meet,
  //           dateFormated,
  //           timeFormated,
  //         };
  //       });
  //     res.render('', {
  //       meetsArray,
  //     });
  //   });
  // });

  app.get('/api/users', function(req, res) {
    db.User.findAll({
      attributes: ['id', 'first_name', 'last_name', 'image_url', 'email', 'locationId'],
    })
      .then(users => {
        res.json(
          users.map(user => {
            return {
              ...user.dataValues,
            };
          }),
        );
      })
      .catch(error => {
        console.log(error);
        res.end();
      });
  });

  app.get('/api/meets', function(req, res) {
    db.Meet.findAll({
      attributes: [
        'id',
        'title',
        'date',
        'time',
        'description',
        'limit_of_attendees',
        'first_line_address',
        'second_line_address',
        'post_code',
        'image_url',
        'createdAt',
        'updatedAt',
        'organizerId',
        'locationId',
      ],
    })
      .then(meets => {
        res.json(
          meets.map(meet => {
            return {
              ...meet.dataValues,
            };
          }),
        );
      })
      .catch(error => {
        console.log(error);
        res.end();
      });
  });
};
