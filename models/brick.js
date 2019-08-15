const mongoose = require('mongoose');

const brickSchema = new mongoose.Schema({
  setNumber: {
      type: Number,
      enum: ['have', 'wish']
  },
  parts: Number,
  // user: { type: Schema.ObjectId, ref: 'User' },
  commentId: { type: Schema.ObjectId, ref: 'Comment' }
})

module.exports =  mongoose.model('Brick', brickSchema);