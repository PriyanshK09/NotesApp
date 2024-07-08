// models/Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  color: {
    background: String,
    text: String,
  },
});

module.exports = mongoose.model('Note', noteSchema);