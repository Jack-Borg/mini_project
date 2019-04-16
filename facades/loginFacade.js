const User = require("../models/user");
const Position = require("../models/position");

async function login(username, password, longitude, latitude, distance) {
	const user = await User.findOne({ username }).exec();

	//user.password will be undefined if user is not found
	if (user.password !== password) {
		return { msg: "wrong username or password", statusCode: 403 };
	}

	const coordinates = [longitude, latitude];

	await Position.findOneAndUpdate(
		{ user: user._id },
		{ user: user._id, created: Date.now(), loc: { type: "Point", coordinates } },
		{ upsert: true, new: true }
	).exec();

	const nearbyFriends = await findNearby(coordinates, distance);

	return {
		user,
		friends: nearbyFriends.map((user) => {
			return {
				username: user.username,
				latitude: user.loc.coordinates[0],
				longitude: user.loc.coordinates[1]
			};
		}),
		msg: "Logged in and found friends",
		statusCode: 200
	};
}

async function findNearby(coordinates, distance) {
	return await Position.find({
		loc: {
			$near: {
				$geometry: { type: "Point", coordinates },
				$minDistance: 0.01,
				$maxDistance: distance
			}
		}
	})
		.populate("user")
		.exec();
}

module.exports = { login };
