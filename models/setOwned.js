const mongoose = require('mongoose');

const setOwnedSchema = new mongoose.Schema({
  setApiId: String,
  partNeeded: {type: mongoose.Schema.Types.ObjectId, ref: 'PartNeeded'} 
  // user: { type: Schema.ObjectId, ref: 'User' },
  //comments: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
})

module.exports =  mongoose.model('SetOwned', setOwnedSchema);