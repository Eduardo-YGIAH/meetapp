const express = require('express');
const session = require('express-session');
const expbs = require('express-handlebars');
const path = require('path');
const passport = require('./config/passport');
const flash = require('express-flash');
require('cloudinary');
require('./config/cloudinary_config');
require('./config/multer_config');

const PORT = process.env.PORT || 8000;
const db = require('./models/index');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
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
db.sequelize
  .sync()
  .then(() =>
    app.listen(PORT, () =>
      console.log(`==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`),
    ),
  );
