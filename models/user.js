var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
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
    admin:   {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);