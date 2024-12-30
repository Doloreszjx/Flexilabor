const admin = require('../config/firebase');
const { errorRes } = require('../helpers/apiResponse');

const authenticateUser = async (req, res, next) => {
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
