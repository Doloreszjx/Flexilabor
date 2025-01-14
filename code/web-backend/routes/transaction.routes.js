const express = require('express');
const txnController = require('../controllers/transactionController');
const authenticateUser = require('../middlewares/authFirebase');

const router = express.Router();

// router.post('/transaction', authenticateUser, txnController.createTransaction);
// router.get(
// 	'/transaction/:id',
// 	authenticateUser,
// 	txnController.getTransactionsById
// );
// router.post('/', authenticateUser, txnController.createTransaction);
// router.get('/:id', authenticateUser, txnController.getTransactionsById);

router.post('/transaction', txnController.createTransaction);
router.get('/transaction/:id', txnController.getTransactionsById);

module.exports = router;
