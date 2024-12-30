const express = require('express');
const txnController = require('../controllers/transactionController');
const authenticateUser = require('../middlewares/authFirebase');

const router = express.Router();

router.post('/transaction', authenticateUser, txnController.createTransaction);
router.get('/transaction/:id', authenticateUser, txnController.getTransactionsById);

module.exports = router;
