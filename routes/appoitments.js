var express = require('express');
var bodyParser = require('body-parser');
var Appoitments = require('../models/appoitment');
var Customers = require('../models/customer');
var Verify    = require('../verify');
var Utils      = require('../utils');

var appoitmentRouter = express.Router();
appoitmentRouter.use(bodyParser.json());

appoitmentRouter.route('/')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
        
  Appoitments.find()
  .where('date').gt(Utils.upcomingDatesOfWeek()[0]).lt(Utils.upcomingDatesOfWeek()[1])
  .populate('customer')
  .populate('service')
  .populate('staff')
  .exec(function (err, appoitment) {
    if (err) return next(err);
    res.json(appoitment);
   });

})

.post(Verify.verifyOrdinaryUser, function(req, res, next) {

	Appoitments.create(req.body, function (err, appoitment) {
      if (err) return next(err);

      var id = appoitment._id;
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Added the appoitment with id: ' + id);
    });

});

appoitmentRouter.route('/:appoitmentId')

.delete(Verify.verifyOrdinaryUser, function(req,res,next) {

  Appoitments.findByIdAndRemove(req.params.appoitmentId, function (err, resp) {
      if (err) return next(err);
        res.json(resp);
    });
})

.put(Verify.verifyOrdinaryUser, function(req,res,next) {
  Appoitments.findByIdAndUpdate(req.params.appoitmentId, {$set: req.body}, {new: true}, function(err, appoitment) {
          if(err) return next(err);

          res.json(appoitment);
       });
});




module.exports = appoitmentRouter;