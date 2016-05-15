var mongoose = require('mongoose');
var validate = require('mongoose-validate');
var Schema = mongoose.Schema;

var staffSchema = new Schema({
    email: { 
        type: String, 
        required: true, 
        validate: [validate.email, 'invalid email address'] 
    },
    phone: String,
 
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Staff', staffSchema);