var express = require('express');
var router = express.Router();
var passwordless = require('passwordless');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { user: req.user });
});

/* GET restricted site. */
router.get('/restricted', passwordless.restricted(),
 function(req, res) {
  res.render('restricted', { user: req.user });
});

/* GET login screen. */
router.get('/login', function(req, res) {
  res.render('login', { user: req.user });
});

/* GET logout. */
router.get('/logout', passwordless.logout(),
	function(req, res) {
  res.redirect('/');
});

router.get('/api/log_me_in', passwordless.acceptToken(), 
    function(req, res) {
        res.render('index', { user: req.user });
});

/* POST login screen. */
router.post('/api/sendtoken', 
	passwordless.requestToken(
		function(user, delivery, callback, req) {
		  user.name = user.toLowerCase();
			callback(null, user);
		}),
	  function(req, res) {
  		res.render('sent');
    }
  );

router.get('/api/me', (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;