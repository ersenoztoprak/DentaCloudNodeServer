var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var StaffSchema = new Schema({
    username: String,
    password: String,
    OauthId: String,
    OauthToken: String,
    firstName: {
    	type: String,
        default: false
    },
    lastName: {
    	type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    admin:   {
        type: Boolean,
        default: false
    }
});


StaffSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Staff', StaffSchema);