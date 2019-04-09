const expect = require("chai").expect;
const dbConnect = require("../dbConnect");
const URI = require("../settings").TEST_DB_URI;
const makeUsers = require("../makeUsers");
const userFacade = require("../facades/userFacade");

describe("User Facade Test", function() {
	before(async function(done) {
		userFacade.setURI(
			"mongodb+srv://jackborg:admin@mongodb-ikrgp.mongodb.net/mini_test?retryWrites=true"
		);
		makeUsers.makeTestData();
		done();
	});

	describe("testing addUser", function() {
		it("Should add new user", function() {
			userFacade.addUser("test", "test", "test", "test", "test@test.test", "test");
			const email = userFacade.findByUserName("test").email;
			expect(email).to.be.equal("test@test.test");
		});
	});

	describe("testing findUserById", function() {
		it("Should find user by username", function() {
			const email = userFacade.findByUserName("a").email;
			expect(email).to.be.equal("a@b.c");
		});
	});
	describe("testing getAllUsers", function() {
		it("Should get all users", function() {
			const users = userFacade.getAllUsers();
			expect(users.find((u) => u.name === "a"));
			expect(users.find((u) => u.name === "b"));
			expect(users.find((u) => u.name === "c"));
		});
	});
});
