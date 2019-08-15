const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  body: String
})

module.exports =  mongoose.model('Comment', commentSchema);