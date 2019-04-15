const expect = require("chai").expect;
const mongoose = require("mongoose");
const dbConnect = require("../dbConnect");
const URI = require("../settings").TEST_DB_URI;
const userFacade = require("../facades/userFacade");
const User = require("../models/user");

describe("User Facade Test", function() {
	before(async function() {
		await dbConnect(URI);
	});

	after(async function() {
		await mongoose.disconnect();
	});

	let users = [];

	beforeEach(async function() {
		await User.deleteMany();
		users = await User.insertMany([
			{
				firstName: "Bob",
				lastName: "Man",
				username: "bm",
				password: "test",
				email: "a@b.c"
			},
			{
				firstName: "Lotte",
				lastName: "Woman",
				username: "lw",
				password: "test",
				email: "c@b.a"
			}
		]);
	});

	it("Should find a user by username", async function() {
		const user = await userFacade.findByUsername("bm");
		expect(user.firstName).to.be.equal("Bob");
	});

	it("Should find a user by id", async function() {
		const user = await userFacade.findById(users[1]._id);
		expect(user.firstName).to.be.equal("Lotte");
	});

	it("Should get all users", async function() {
		const users = await userFacade.getAllUsers();
		expect(users.length).to.be.equal(2);
		expect(users[0].firstName).to.be.equal("Bob");
		expect(users[1].firstName).to.be.equal("Lotte");
	});

	it("Should add a new user", async function() {
		const newUser = await userFacade.addUser("test", "test", "test", "test", "test@test.test");
		const getUser = await userFacade.findById(newUser._id);
		expect(newUser).to.not.be.null;
		expect(newUser.username).to.be.equal(getUser.username);
	});
});
