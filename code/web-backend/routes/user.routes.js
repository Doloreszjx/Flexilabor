const express = require('express');
const userController = require('../controllers/userController');
const authenticateUser = require('../middlewares/authFirebase');

const router = express.Router();

router.post('/users', authenticateUser, userController.createUser);
router.post('/users:email', authenticateUser, userController.createUser);
router.get('/users/:id', authenticateUser, userController.getUserById);
router.put('/users/:id', authenticateUser, userController.updateUser);
router.put('/addContact', authenticateUser, userController.addContact);

module.exports = router;
