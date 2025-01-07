const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/userModel');
const Transactions = require('../models/transactionsModel');
const Jobs = require('../models/jobsModel');

const connectDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('Database is connected');
		// // 假设存在名为 User 的模型，查询所有用户数据并输出
		// try {
		// 	const users = await User.find({});
		// 	console.log('Users:', users);

		// 	// 假设存在名为 Job 的模型，查询所有职位数据并输出
		// 	const jobs = await Jobs.find({});
		// 	console.log('Jobs:', jobs);

		// 	// 假设存在名为 Transaction 的模型，查询所有交易数据并输出
		// 	const transactions = await Transactions.find({});
		// 	console.log('Transactions:', transactions);
		// } catch (error) {
		// 	console.log('error');
		// }
	} catch (error) {
		console.error('Database Connection failed with an error:', error.message);
		process.exit(1);
	}
};

module.exports = connectDatabase;
