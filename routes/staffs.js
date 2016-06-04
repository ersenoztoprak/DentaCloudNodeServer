var express = require('express');
var bodyParser = require('body-parser');
var Staffs = require('../models/staff');
var Verify    = require('../verify');

var staffRouter = express.Router();
staffRouter.use(bodyParser.json());

staffRouter.route('/')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
        
  Staffs.find(function(err, staff) {
  	if (err) return next(err);
  	res.json(staff);
  });


})

.post(Verify.verifyOrdinaryUser, function(req, res, next) {

	Staffs.create(req.body, function (err, staff) {
      if (err) return next(err);
      console.log('staff created!');
      var id = staff._id;

      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Added the staff with id: ' + id);
    });
});

// Handle requests to certain ids
staffRouter.route('/:staffId')

.put(Verify.verifyOrdinaryUser, function(req,res,next) {
	Staffs.findByIdAndUpdate(req.params.staffId, {$set: req.body}, {new: true}, function(err, staff) {
          if(err) return next(err);

          res.json(staff);
       });
})
.delete(Verify.verifyOrdinaryUser, function(req,res,next) {

	Staffs.findByIdAndRemove(req.params.staffId, function (err, resp) {
	    if (err) return next(err);
        res.json(resp);
    });
});


module.exports = staffRouter;