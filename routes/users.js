var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var Verify    = require('../verify');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function (err, user) {
    if (err) next(err);
    res.json(user);
  });
});

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }),
      req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }

        if (req.body.firstName)
          user.firstName = req.body.firstName;

        if (req.body.lastName)
          user.lastName = req.body.lastName;

		if (req.body.admin)
          user.admin = req.body.admin;      	

        user.save(function(err, user) {
          passport.authenticate('local')(req, res, function () {
            return res.status(200).json({status: 'Registration Successful!'});
          });
        });

        
    });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
        
      var token = Verify.getToken({"username": user.username, "_id": user._id, "admin": user.admin});
      
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

router.get('/logout', function(req, res) {
    req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

module.exports = router;
