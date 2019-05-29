// const dbConnect = require("./dbConnect");
// dbConnect(require("./settings").DEV_DB_URI);

const User = require("./models/user.js");
const LocationBlog = require("./models/locationBlog.js");
const Position = require("./models/position.js");

function positionCreator(lon, lat, userId, dateInFuture) {
	let posDetail = { user: userId, loc: { coordinates: [lat, lon] } };
	if (dateInFuture) {
		posDetail.created = "2022-09-25T20:40:21.899Z";
	}
	return posDetail;
}
async function makeTestData() {
	await User.deleteMany({});
	await Position.deleteMany({});
	await LocationBlog.deleteMany({});
	console.log("Making users");
	try {
		const userInofs = [
			{
				firstName: "a",
				lastName: "a",
				username: "a",
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
				username: "b",
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
				username: "c",
				password: "c",
				email: "c@b.c",
				job: [
					{ type: "spand", company: "spand inc", companyUrl: "spand.dk" },
					{ type: "stol", company: "stol inc", companyUrl: "stol.dk" }
				]
			}
		];

		const users = await User.insertMany(userInofs);

		const positions = [
			positionCreator(12.523212432861328, 55.78120695355271, users[0]._id, true),
			positionCreator(12.556171417236328, 55.78690207695228, users[1]._id, true),
			positionCreator(12.508792877197266, 55.76971764625502, users[2]._id, true)
		];
		const blogs = [
			{ info: "Cool Place", pos: { longitude: 26, latitude: 57 }, author: users[0]._id }
		];

		const pos = await Position.insertMany(positions);
		const blog = await LocationBlog.insertMany(blogs);
	} catch (err) {
		console.log(err);
	}
}
module.exports = makeTestData;
