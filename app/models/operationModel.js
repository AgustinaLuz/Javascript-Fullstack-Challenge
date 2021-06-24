const mongoose = require('mongoose');

const { Schema } = mongoose;

const operationModel = new Schema({
    concept: { type:String },
    amount: { type:String },
    date: { type:String },
    category: { type:String },
    type: { type:String },
});

module.exports = mongoose.model('Operation', operationModel);