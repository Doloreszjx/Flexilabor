const express = require('express');
const userController = require('../controllers/userController');
const authenticateUser = require('../middlewares/authFirebase');

const router = express.Router();

// router.post('/users', authenticateUser, userController.createUser);

// router.get('/users/:id', authenticateUser, userController.getUserById);
// router.put('/users/:id', authenticateUser, userController.updateUser);
router.put('/addContact', authenticateUser, userController.addContact);

router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);

router.get('/users/:emailId', async (req, res) => {
	console.log('/users/:email', { req });
	const email = req.params.email;
	try {
		const user = await User.findOne({ email });
		if (user) {
			res.json({ data: [user] });
		} else {
			res.status(404).json({ message: 'User with this email not found' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error retrieving user information', error });
	}
});

module.exports = router;
