const dbConnect = require("../dbConnect");
const URI = require("../settings").DEV_DB_URI;

function setURI(uri) {
	URI = uri;
}

const User = require("../models/user.js");

function addUser(fName, lName, username, password, email, job) {
	throw Error("not implemented");
}

function getAllUsers() {
	throw Error("not implemented");
}

function findByUserName(username) {
	dbConnect.connect(URI);
	User.findOne({ username }, function(err, user) {
		if (err) {
			return "user not found";
		}
		return user;
	});
	dbConnect.disconnect();
}

module.exports = { addUser, getAllUsers, findByUserName, setURI };
