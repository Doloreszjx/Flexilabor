const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  abn: { type: String, required: false }, 
  role: { type: String, required: true,  enum: ['Customer', 'Contractor', 'Worker'] },
  workType: { type: String, required: false },
  profilePicture: { type: String, required: false },
  tools: {type: String, required: false},
  contacts: { type: [String], default: [] }
});

module.exports = mongoose.model('User', userSchema);
