const User = require('../models/userModel');
const { successRes, errorRes } = require('../helpers/apiResponse');

// Create user on sign up
exports.createUser = async (req, res) => {
	console.log('createUser');
	const existingUser = await User.findOne({ email: req?.body?.email });
	if (!!existingUser) {
		errorRes(res, 'This email already exists. Please choose another one.');
		console.log();
	} else {
		try {
			const user = new User(req.body);
			await user.save();
			successRes(res, 'User added successfully1111', user, 200);
		} catch (error) {
			errorRes(res, 'Error creating user', error);
		}
	}
};

// Fetch user details by ID
exports.getUserById = async (req, res) => {
	console.log('getUserById');
	try {
		const user = await User.find({ email: req.params.id });
		if (!user) return errorRes(res, 'User not found', null, 404);
		successRes(res, 'User retrieved successfully', user);
	} catch (error) {
		errorRes(res, 'Error retrieving user', error);
	}
};

// Update user information
exports.updateUser = async (req, res) => {
	const { abn, profilePicture, firstName, lastName } = req.body;
	const updateFields = {};
	if (profilePicture) updateFields.profilePicture = profilePicture;
	if (abn) updateFields.abn = abn;
	if (firstName) updateFields.firstName = firstName;
	if (lastName) updateFields.lastName = lastName;

	try {
		const user = await User.findOneAndUpdate(
			{ email: req.params.id },
			{ $set: updateFields },
			{ new: true }
		);

		if (!user) return errorRes(res, 'User not found', null, 404);

		successRes(res, 'User updated successfully', user);
	} catch (error) {
		errorRes(res, 'Error updating user', error);
	}
};

// Add contact to unlock messaging
exports.addContact = async (req, res) => {
	const { userId, contactUid } = req.body;

	try {
		if (!userId || !contactUid) {
			return res
				.status(400)
				.json({ message: 'UserId and contactUid are both required' });
		}

		const user = await User.findOne({ uid: userId });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		if (user.contacts.includes(contactUid)) {
			return res.status(400).json({ message: 'Contact already exists' });
		}

		user.contacts.push(contactUid);
		await user.save();
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};
