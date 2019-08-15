const mongoose = require('mongoose');

const brickWantSchema = new mongoose.Schema({
  setNumber: Number,
  parts: Number,
  user: { type: Schema.ObjectId, ref: 'User' },
  comments: [
    {
      body: { type: String, default: '', maxlength: 1000 },
      user: { type: Schema.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now }
    }
  ],
})

module.exports =  mongoose.model('BrickWant', brickWantSchema);