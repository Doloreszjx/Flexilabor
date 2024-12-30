const mongoose = require('mongoose');
const { createTransaction, getTransactionsById } = require('../controllers/transactionController');
const Transactions = require('../models/transactionsModel');
const { format } = require('date-fns');

require('dotenv').config();

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const txn = new Transactions({
    uid: "test-uid-2",
    transactionType: "CREDIT",
    amount: 100,
    createdAt: new Date(),
  });
  await txn.save();
});

afterEach(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('POST /api/transactions', () => {
  it('should create a transaction successfully', async () => {
    const req = {
      body: {
        uid: "test-uid-2",
        transactionType: "DEBIT",
        amount: 5,
        createdAt: new Date(),
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createTransaction(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Transaction added successfully',
        data: expect.objectContaining({
          amount: 5,
        }),
      })
    );
    const addedTxn = await Transactions.findOne({ amount: 5 });
    expect(addedTxn).not.toBeNull();
    expect(addedTxn.transactionType).toBe('DEBIT');
  });

});

describe('GET /api/transactions/:id', () => {
  it('should retrieve transactions by user ID successfully', async () => {
    const req = {
      params: { id: 'test-uid-2' },  
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getTransactionsById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Transactions retrieved successfully',
        data: expect.objectContaining({
          transactions: expect.arrayContaining([
            expect.objectContaining({
              transactionType: 'CREDIT',
              amount: 100,
            })
          ]),
          netBalance: 100,
        }),
      })
    );
  });
});
