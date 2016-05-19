var express = require('express');
var bodyParser = require('body-parser');
var Customers = require('../models/customer');
var Verify    = require('../verify');

var customerRouter = express.Router();
customerRouter.use(bodyParser.json());

customerRouter.route('/')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
        
  if (req.query.name) {

    var query = Customers.find({firstName: new RegExp(req.query.name, "i")});

    query.exec(function (err, customer) {
        if (err) return next(err);
        res.json(customer);
    });
  }
  else {
    Customers.find(function(err, customer) {
      if (err) return next(err);
      res.json(customer);
    });
  }    
  
})

.post(Verify.verifyOrdinaryUser, function(req, res, next) {

	Customers.create(req.body, function (err, customer) {
      if (err) return next(err);
      console.log('customer created!');
      var id = customer._id;
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Added the customer with id: ' + id);
    });
});

// Handle requests to certain ids
customerRouter.route('/:customerId')

.put(Verify.verifyOrdinaryUser, function(req,res,next) {
	Customers.findByIdAndUpdate(req.params.customerId, {$set: req.body}, {new: true}, function(err, customer) {
          if(err) return next(err);

          res.json(customer);
       });
})
.delete(Verify.verifyOrdinaryUser, function(req,res,next) {

	Customers.findByIdAndRemove(req.params.customerId, function (err, resp) {
	    if (err) return next(err);
        res.json(resp);
    });
});



module.exports = customerRouter;