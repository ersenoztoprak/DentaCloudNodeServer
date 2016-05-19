var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var serviceSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    description: String,
    price: { 
        type: Currency,
        required: true 
    },
    time: {
        type: Number,
        required: true
    }
});


module.exports = mongoose.model('Service', serviceSchema);