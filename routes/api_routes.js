const db = require('../models/index');
const { Op, QueryTypes } = require('sequelize');
const passport = require('../config/passport');
const isAuthenticated = require('../config/middleware/isAuthenticated');
const cloudinary = require('cloudinary');
require('../config/cloudinary_config');
const upload = require('../config/multer_config');

module.exports = function(app) {
  // AUTHENTICATION

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post(
    '/api/login',
    passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: true,
    }),
    function(req, res) {
      res.redirect('/profile');
    },
  );

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post('/api/signup', function(req, res) {
    const { first_name, last_name, email, password } = req.body;

    if (first_name && last_name && email && password) {
      db.User.create({
        first_name,
        last_name,
        email,
        password,
      })
        .then(function() {
          res.redirect('/login');
        })
        .catch(function(err) {
          res.status(401).json(err);
        });
    } else {
      res.status(422).json('Bad input');
    }
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

  app.post('/api/upload_avatar', upload.single('image'), async (req, res) => {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    await db.User.update(
      { image_url: result.secure_url },
      {
        where: {
          email: req.user.email,
        },
      },
    );
    var user = req.user;
    user.image_url = result.secure_url;
    req.logIn(user, function(error) {
      if (!error) {
        // successfully serialized user to session
        res.redirect('/profile');
      }
    });
  });

  app.post('/profile_details_update', isAuthenticated, async (req, res) => {
    try {
      const { first_name, last_name, location } = await req.body;
      console.log(location);
      const location_id = await db.Location.findAll({
        attributes: ['id'],
        where: {
          town: {
            [Op.like]: `%${location}%`,
          },
        },
      });
      console.log(req.session.passport.user);
      console.log('The value of location Id is = ' + location_id[0].dataValues.id);
      await db.User.sequelize.query(
        'UPDATE users SET first_name = :first_name, last_name = :last_name, locationId = :locationId WHERE email = :email',
        {
          replacements: {
            first_name: first_name,
            last_name: last_name,
            locationId: Number(location_id[0].dataValues.id),
            email: req.user.email,
          },
          type: QueryTypes.SELECT,
        },
      );
      console.log(req.session.passport.user);
      var user = req.user;
      console.log(user);

      user.first_name = first_name;
      user.last_name = last_name;
      user.location = location;
      console.log(user.first_name);
      console.log(user.last_name);
      console.log(user.location);

      req.logIn(user, function(error) {
        if (!error) {
          res.redirect('/profile');
        }
      });
    } catch (err) {
      console.log('MY BIG ERROR WAS: ' + err);
    }
  });

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
