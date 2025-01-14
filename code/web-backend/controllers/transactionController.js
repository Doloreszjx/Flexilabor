const { format } = require('date-fns');
const Transactions = require('../models/transactionsModel');
const { successRes, errorRes } = require('../helpers/apiResponse');

// Create transaction
exports.createTransaction = async (req, res) => {
	try {
		const txn = new Transactions(req.body);
		await txn.save();
		successRes(res, 'Transaction added successfully', txn, 200);
	} catch (error) {
		errorRes(res, 'Error creating transaction', error);
	}
};

// Fetch transactions by ID
exports.getTransactionsById = async (req, res) => {
	try {
		let txns = await Transactions.find({ uid: req.params.id });

		if (!txns || txns.length === 0) {
			return errorRes(res, 'No Transactions found', null, 404);
		}

		txns = txns
			.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
			.map((txn) => ({
				...txn._doc,
				createdAt: format(new Date(txn.createdAt), 'dd-MM-yyyy'),
			}));

		const netBalance = txns.reduce((balance, txn) => {
			return txn.transactionType === 'CREDIT'
				? balance + txn.amount
				: balance - txn.amount;
		}, 0);

		successRes(res, 'Transactions retrieved successfully', {
			transactions: txns,
			netBalance,
		});
	} catch (error) {
		errorRes(res, 'Error retrieving transactions', error);
	}
};
