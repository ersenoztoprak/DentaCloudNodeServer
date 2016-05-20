var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var appoitmentSchema = new Schema({
    
    staff:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff'
    },
    service:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    },
    customer:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    date: {
        type: Number,
        required: true
    },
    note: String

    
});


module.exports = mongoose.model('Appoitment', appoitmentSchema);