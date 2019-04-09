const dbConnect = require("./dbConnect");
const URI = require("./settings").TEST_DB_URI;

const User = require("./models/user.js");
const LocationBlog = require("./models/locationBlog.js");
const Position = require("./models/position.js");

function positionCreator(lon, lat, userId, dateInFuture) {
	let posDetail = { user: userId, loc: { coordinates: [lon, lat] } };
	if (dateInFuture) {
		posDetail.created = "2022-09-25T20:40:21.899Z";
	}
	return posDetail;
}
async function makeTestData() {
	dbConnect.connect(URI);
	console.log("Making users");
	try {
		const userInofs = [
			{
				firstName: "a",
				lastName: "a",
				userName: "a",
				password: "a",
				email: "a@b.c",
				job: [
					{ type: "spand", company: "spand inc", companyUrl: "spand.dk" },
					{ type: "stol", company: "stol inc", companyUrl: "stol.dk" }
				]
			},
			{
				firstName: "b",
				lastName: "b",
				userName: "b",
				password: "b",
				email: "b@b.c",
				job: [
					{ type: "spand", company: "spand inc", companyUrl: "spand.dk" },
					{ type: "stol", company: "stol inc", companyUrl: "stol.dk" }
				]
			},
			{
				firstName: "c",
				lastName: "c",
				userName: "c",
				password: "c",
				email: "c@b.c",
				job: [
					{ type: "spand", company: "spand inc", companyUrl: "spand.dk" },
					{ type: "stol", company: "stol inc", companyUrl: "stol.dk" }
				]
			}
		];
		await User.deleteMany({});
		await Position.deleteMany({});
		await LocationBlog.deleteMany({});

		const users = await User.insertMany(userInofs);

		const positions = [
			positionCreator(10, 11, users[0]._id),
			positionCreator(11, 12, users[1]._id, true)
		];
		const blogs = [
			{ info: "Cool Place", pos: { longitude: 26, latitude: 57 }, author: users[0]._id }
		];

		const pos = await Position.insertMany(positions);
		const blog = await LocationBlog.insertMany(blogs);
	} catch (err) {
		console.log(err);
	}
	dbConnect.disconnect();
}
module.exports = { makeTestData };
