const express = require('express');
const session = require('express-session');
const expbs = require('express-handlebars');
const path = require('path');
const passport = require('./config/passport');

var PORT = process.env.PORT || 8000;
var db = require('./models/index');

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/imgs', express.static(path.join(__dirname, 'public/imgs')));

app.use(session({ secret: process.env.SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//HANDLEBARS CONFIGURATION
app.engine(
  'handlebars',
  expbs({
    defaultLayout: 'main',
  }),
);

app.set('view engine', 'handlebars');

//ROUTES

require('./routes/api_routes.js')(app);
require('./routes/html_routes.js')(app);

//OPENING PORT
// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  });
});
