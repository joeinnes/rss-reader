var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passwordless = require('passwordless');
var MongoStore = require('passwordless-mongostore');
var fourOhFour = require('../middleware/404');
var devErrorHandler = require('../middleware/DevErrorHandler');
var cors = require('../middleware/CORS');
var routes = require('../routes/index');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressSession({secret: '42', saveUninitialized: false, resave: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passwordless.sessionSupport());
app.use(passwordless.acceptToken({ successRedirect: '/' }));
app.use(fourOhFour);
app.use(devErrorHandler);
app.use(cors);
app.set('port', process.env.PORT || 3000);

// Routes
app.use('/', routes);

app.listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port'));
});

module.exports = app;