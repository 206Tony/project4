const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  setOwned: {type: mongoose.Schema.Types.ObjectId, ref: 'SetOwned'},
  body: String
})

module.exports =  mongoose.model('Comment', commentSchema);