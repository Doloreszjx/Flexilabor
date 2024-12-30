require('dotenv').config();
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// const PORT = process.env.PORT || 8080;
const PORT = 8080;

app.use(cors({ origin: true, credentials: true }));

const userRoutes = require('./routes/user.routes');
const jobsRoutes = require('./routes/jobs.routes');
const transactionRoutes = require('./routes/transaction.routes');

const connectDatabase = require('./config/mongoDb');
connectDatabase();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api', userRoutes);
app.use('/api', jobsRoutes);
app.use('/api', transactionRoutes);

app.get('/', (req, res) => {
	res.send('Backend Server is up');
});

const server = app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
	console.log('Received SIGINT, shutting down gracefully.');
	server.close(() => {
		console.log('HTTP server closed');
		process.exit(0);
	});
});
