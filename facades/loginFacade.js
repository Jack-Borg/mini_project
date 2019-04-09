const User = require('../models/user');
const Position = require('../models/position');

async function login(userName, password, longitude, latitude, distance) {
	const user = await User.findOne({ userName }).exec();

	//user.password will be undefined if user is not found
	if (user.password !== password) {
		return { msg: 'wrong username or password', status: 403 };
	}

	const coordinates = [longitude, latitude];
	await Position.findOneAndUpdate(
		{ user: user._id },
		{ user, created: Date.now(), loc: { type: 'point', coordinates } }
	).exec();

	const nearbyFriends = await findNearby(coordinates, distance);

	return nearbyFriends;
}

async function findNearby(coordinates, distance) {
	return await Position.find({
		loc: {
			$near: {
				$geometry: { type: 'Point', coordinates },
				$minDistance: 0.01,
				$maxDistance: distance
			}
		}
	})
		.populate('user')
		.exec();
}

module.exports = { login };
