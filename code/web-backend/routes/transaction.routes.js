const express = require('express');
const txnController = require('../controllers/transactionController');
const authenticateUser = require('../middlewares/authFirebase');

const router = express.Router();

// router.post('/transactions', authenticateUser, txnController.createTransaction);
// router.get('/transactions/:id', authenticateUser, txnController.getTransactionsById);
router.post('/', authenticateUser, txnController.createTransaction);
router.get('/:id', authenticateUser, txnController.getTransactionsById);


module.exports = router;
