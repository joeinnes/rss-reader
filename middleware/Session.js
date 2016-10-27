var session = require('express-session')

var sess = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
});

module.exports = sess;