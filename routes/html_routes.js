const isAuthenticated = require('../config/middleware/isAuthenticated');
const db = require('../models/index');

module.exports = function(app) {
  app.get('/', (req, res) => {
    // If the user already has an account send them to the index page
    if (req.user) {
      console.log('THIS IS THE REQ.USER VALUE = ' + req.user.first_name);
      db.User.findOne({
        where: {
          email: req.user.email,
        },
      }).then(user => {
        console.log(user);
        res.render('index', {
          user,
        });
      });
    } else {
      db.Meet.findAll({
        attributes: [
          'id',
          'title',
          'date',
          'time',
          'image_url',
          'description',
          'meetLocationId',
          'meetUserOrganizerId',
        ],
      }).then(meets => {
        const meetsArray = meets
          .map(meet => {
            return {
              ...meet.dataValues,
            };
          })
          .map(meet => {
            let dateString;
            let dateFormated;
            let timeFormated = meet.time.substr(0, 5);
            dateString = meet.date.toString();
            dateFormated = dateString.substr(0, 16);

            return {
              ...meet,
              dateFormated,
              timeFormated,
            };
          });

        console.log(meetsArray[0]);
        res.render('landing', {
          meetsArray,
        });
      });
    }
  });

  app.get('/login', (req, res) => {
    if (req.user) {
      res.render('index');
    }
    res.render('login');
  });

  app.get('/signup', (req, res) => {
    if (req.user) {
      res.render('index', {
        message: 'You are currently logged in.',
      });
    }
    res.render('signup');
  });

  app.get('/profile', isAuthenticated, (req, res) => {
    let { first_name, last_name, email, image_url, location } = req.user;
    res.render('profile', {
      first_name,
      last_name,
      email,
      image_url,
      location,
    });
  });

  app.get('/', isAuthenticated, (req, res) => {
    res.render('index');
  });
};
