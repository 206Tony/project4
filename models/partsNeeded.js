const mongoose = require('mongoose');

const partsNeededSchema = new mongoose.Schema({
  partApiId: String,
  numOfPartsMissing: Number
})

module.exports =  mongoose.model('PartsNeeded', partsNeededSchema);