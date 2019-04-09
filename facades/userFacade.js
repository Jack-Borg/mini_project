const User = require('../models/user.js');

function addUser(firstName, lastName, userName, password, email) {
	return new User({
		firstName,
		lastName,
		userName,
		password,
		email
	}).save();
}

function getAllUsers() {
	return User.find({}).exec();
}

function findByUserName(userName) {
	return User.findOne({ userName }).exec();
}

function findById(_id) {
	return User.findOne({ _id });
}

module.exports = { addUser, getAllUsers, findByUserName, findById };
