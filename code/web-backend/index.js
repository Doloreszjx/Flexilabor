// require('dotenv').config();
// const cors = require('cors');

// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// // const PORT = process.env.PORT || 8080;
// const PORT = 8080;

// // app.use(cors({ origin: true, credentials: true }));
// const corsOptions = {
// 	origin: 'http://localhost:3000', // 确保前端端口与这里一致
// 	methods: 'GET,POST,PUT,DELETE,OPTIONS',
// 	allowedHeaders: 'Content-Type,Authorization',
// 	credentials: true // 支持 Cookies
//   };

// app.use(cors(corsOptions));

//   // 处理预检请求
// app.options('*', cors(corsOptions));

// const userRoutes = require('./routes/user.routes');
// const jobsRoutes = require('./routes/jobs.routes');
// const transactionRoutes = require('./routes/transaction.routes');

// const connectDatabase = require('./config/mongoDb');
// connectDatabase();

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// app.use('/api', userRoutes);
// app.use('/api', jobsRoutes);
// app.use('/api', transactionRoutes);

// app.get('/', (req, res) => {
// 	res.send('Backend Server is up');
// });

// const server = app.listen(PORT, () => {
// 	console.log(`Server running on http://localhost:${PORT}`);
// });

// process.on('SIGINT', () => {
// 	console.log('Received SIGINT, shutting down gracefully.');
// 	server.close(() => {
// 		console.log('HTTP server closed');
// 		process.exit(0);
// 	});
// });
// require('dotenv').config();
// const cors = require('cors');
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = process.env.PORT || 8080;

// // 全局 CORS 配置
// const corsOptions = {
// 	origin: 'http://localhost:3000', // 确保与前端端口一致
// 	methods: 'GET,POST,PUT,DELETE,OPTIONS',
// 	allowedHeaders: 'Content-Type,Authorization,Accept,X-Requested-With',
// 	credentials: true // 允许 Cookies 和认证信息
// };
// app.use(cors(corsOptions)); // 应用 CORS
// app.options('*', cors(corsOptions)); // 显式处理 OPTIONS 请求

// // 中间件配置
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// // 数据库连接
// const connectDatabase = require('./config/mongoDb');
// connectDatabase();

// // 路由引入
// const userRoutes = require('./routes/user.routes');
// const jobsRoutes = require('./routes/jobs.routes');
// const transactionRoutes = require('./routes/transaction.routes');

// // 路由配置
// app.use('/api', userRoutes);
// app.use('/api', jobsRoutes);
// app.use('/api', transactionRoutes);

// // 测试服务器是否运行
// app.get('/', (_req, res) => {
// 	res.send('Backend Server is up');
// });

// // 启动服务器
// const server = app.listen(PORT, () => {
// 	console.log(`Server running on http://localhost:${PORT}`);
// });

// // 优雅关闭服务器
// process.on('SIGINT', () => {
// 	console.log('Received SIGINT, shutting down gracefully.');
// 	server.close(() => {
// 		console.log('HTTP server closed');
// 		process.exit(0);
// 	});
// });
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;

// 全局 CORS 配置
const corsOptions = {
	origin: 'http://localhost:3000', // 确保与前端端口一致
	methods: 'GET,POST,PUT,DELETE,OPTIONS',
	allowedHeaders: 'Content-Type,Authorization,Accept,X-Requested-With',
	credentials: true, // 支持 Cookies 和认证
};
app.use(cors(corsOptions)); // 应用 CORS 设置

// 允许 OPTIONS 请求直接返回
app.options('*', cors(corsOptions)); // 确保 OPTIONS 请求自动处理

// 中间件配置
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// 数据库连接
const connectDatabase = require('./config/mongoDb');
connectDatabase();

// 路由引入
const userRoutes = require('./routes/user.routes');
const jobsRoutes = require('./routes/jobs.routes');
const transactionRoutes = require('./routes/transaction.routes');

// 路由配置
app.use('/api', userRoutes);
// app.use(`http://localhost:${PORT}/api`, userRoutes);
app.use('/api', jobsRoutes);
app.use('/api', transactionRoutes);

// 测试服务器是否运行
app.get('/', (req, res) => {
	res.send('Backend Server is up');
});

// 启动服务器
const server = app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

// 优雅关闭服务器
process.on('SIGINT', () => {
	console.log('Received SIGINT, shutting down gracefully.');
	server.close(() => {
		console.log('HTTP server closed');
		process.exit(0);
	});
});
