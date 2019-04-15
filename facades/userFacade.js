const User = require("../models/user.js");

function addUser(firstName, lastName, username, password, email) {
	return new User({
		firstName,
		lastName,
		username,
		password,
		email
	}).save();
}

function getAllUsers() {
	return User.find();
}

function findByUsername(username) {
	return User.findOne({ username });
}

function findById(_id) {
	return User.findOne({ _id });
}

module.exports = { addUser, getAllUsers, findByUsername, findById };
