const User = require("../models/user");
const Position = require("../models/position");

async function login({ username, password, longitude, latitude, distance }) {
	// console.log(username, password, latitude, longitude, distance);
	const user = await User.findOne({ username }).exec();
	// console.log("uesr: ", user);
	//user.password will be undefined if user is not found
	if (!user || user.password !== password) {
		console.log("uho");
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
		friends: nearbyFriends.map((friend) => {
			return {
				username: friend.user.username,
				latitude: friend.loc.coordinates[0],
				longitude: friend.loc.coordinates[1]
			};
		})
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
