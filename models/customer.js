var mongoose = require('mongoose');
var validate = require('mongoose-validate');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    email: { 
        type: String, 
        validate: [validate.email, 'invalid email address'] 
    },
    phone: {
        type: String,
        required: true
    },
 
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String
    }

});

customerSchema.methods.getName = function () {
    return (this.firstName + ' ' + this.lastName);
};


module.exports = mongoose.model('Customer', customerSchema);