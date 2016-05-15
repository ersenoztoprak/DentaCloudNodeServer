var express = require('express');
var bodyParser = require('body-parser');
var Staffs = require('../models/staff');
var Verify    = require('../verify');

var staffRouter = express.Router();
staffRouter.use(bodyParser.json());

staffRouter.route('/')

.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req,res,next){
        
  Staffs.find(function(err, staff) {
  	if (err) return next(err);
  	res.json(staff);
  });


})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {

	Staffs.create(req.body, function (err, staff) {
      if (err) return next(err);
      console.log('staff created!');
      var id = staff._id;

      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Added the staff with id: ' + id);
    });
});


module.exports = staffRouter;