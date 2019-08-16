const mongoose = require('mongoose');

const setsOwnedSchema = new mongoose.Schema({
  setApiId: String,
  partsNeeded: [{type: mongoose.Schema.Types.ObjectId, ref: 'PartsNeeded'}]
  // user: { type: Schema.ObjectId, ref: 'User' },
  //comments: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
})

module.exports =  mongoose.model('SetsOwned', setsOwnedSchema);