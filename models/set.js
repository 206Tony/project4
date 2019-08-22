const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
  setName: String,
  partsNeeded: [{type: mongoose.Schema.Types.ObjectId, ref: 'PartsNeeded'}],
  user: { type: mongoose.Schema.Types.ObjectId, ref:  'User' },
  comments: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
})

module.exports =  mongoose.model('Set', setSchema);

