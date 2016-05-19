var express = require('express');
var bodyParser = require('body-parser');
var Services = require('../models/service');
var Verify    = require('../verify');

var serviceRouter = express.Router();
serviceRouter.use(bodyParser.json());

serviceRouter.route('/')

.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req,res,next){
        
  Services.find(function(err, service) {
  	if (err) return next(err);
  	res.json(service);
  });


})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {

	Services.create(req.body, function (err, service) {
      if (err) res.end(''+err);
      else {
        console.log('service created!');
        var id = service._id;

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Added the service with id: ' + id);
      }
    });
});

// Handle requests to certain ids
serviceRouter.route('/:serviceId')

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req,res,next) {
	Services.findByIdAndUpdate(req.params.serviceId, {$set: req.body}, {new: true}, function(err, service) {
          if(err) return next(err);

          res.json(service);
       });
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req,res,next) {

	Services.findByIdAndRemove(req.params.serviceId, function (err, resp) {
	    if (err) return next(err);
        res.json(resp);
    });
});


module.exports = serviceRouter;