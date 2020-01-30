const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models/index");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the index page
    if (req.user) {
      db.User.findOne({
        where: {
          email: req.user.email
        }
      }).then(user => {
        console.log(user);
        res.render("index", {
          user
        });
      }); /* if the user is logged in you will also need some meets... so you could wait to see if there is a user, 
             and then run the next Meet.findAll and pass both the meets and the user (if they exist) to the index.
      */
    } else {
      db.Meet.findAll({
        attributes: [
          "id",
          "title",
          "date",
          "time",
          "image_url",
          "description",
          "locationId",
          "organizerId"
        ]
      }).then(meets => {
        const meetsArray = meets
          .map(meet => {
            return {
              ...meet.dataValues
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
              timeFormated
            };
          });
          /* this might be more efficient to merge these two maps otherwise 
          you are doing two loops when you could be doing just one. */
        console.log(meetsArray[0]);
        res.render("landing", {
          meetsArray
        });
      });
    }
  });

  app.get("/login", (req, res) => {
    if (req.user) {
      res.render("index"); /* or redirect to / so they get the page with their user and meets */
    }
    res.render("login");
  });

  app.get("/signup", (req, res) => {
    if (req.user) {
      res.render("index", {
        message: "You are currently logged in."
      });/* as above */
    }
    res.render("signup");
  });

  app.get("/profile", isAuthenticated, (req, res) => {
    res.render("profile");
  });

  /* is this next route necessary? as you already have a app.get("/") which checks for req.user already */
  app.get("/", isAuthenticated, (req, res) => {
    res.render("index");
  });
};
