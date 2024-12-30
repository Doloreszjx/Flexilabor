const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  amount: { type: Number, required: true },
  transactionType: { type: String, required: true, enum: ['CREDIT', 'DEBIT'] },
  createdAt: { type: Date, required: true, default: Date.now() }
});

module.exports = mongoose.model('Transactions', transactionSchema);
