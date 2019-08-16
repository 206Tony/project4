const mongoose = require('mongoose');

const partNeededSchema = new mongoose.Schema({
  partApiId: String,
  numOfPartsMissing: Number
})

module.exports =  mongoose.model('PartNeeded', partNeededSchema);