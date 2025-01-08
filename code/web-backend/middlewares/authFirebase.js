// const admin = require('../config/firebase');
// const { errorRes } = require('../helpers/apiResponse');

// const authenticateUser = async (req, res, next) => {
//   // 允许 OPTIONS 请求直接通过
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }

//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return errorRes(res, "Token unavailable", null, 401);
//   }

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(authHeader.split(' ')[1]);
//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     errorRes(res, "Unauthorized user", error, 401);
//   }
// };

// module.exports = authenticateUser;
const admin = require('../config/firebase');
const { errorRes } = require('../helpers/apiResponse');

const authenticateUser = async (req, res, next) => {
  // 允许 OPTIONS 请求直接返回
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(200); // 返回 200 状态码
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return errorRes(res, "Token unavailable", null, 401);
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(authHeader.split(' ')[1]);
    req.user = decodedToken;
    next();
  } catch (error) {
    errorRes(res, "Unauthorized user", error, 401);
  }
};

module.exports = authenticateUser;
