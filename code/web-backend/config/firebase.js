const admin = require('firebase-admin');

const serviceAccount = require('../firebase-new-adminsdk.json');
// const serviceAccount = require('../firebase-adminsdk.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
