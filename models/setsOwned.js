const mongoose = require('mongoose');

const setsOwnedSchema = new mongoose.Schema({
  partsNeeded: [{type: mongoose.Schema.Types.ObjectId, ref: 'PartsNeeded'}],
  user: { type: mongoose.Schema.Types.ObjectId, ref:  'User' },
  comments: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  setApiId: String,
})

module.exports =  mongoose.model('SetsOwned', setsOwnedSchema);