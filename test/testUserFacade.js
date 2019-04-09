const expect = require('chai').expect;
const mongoose = require('mongoose');
const dbConnect = require('../dbConnect');
const URI = require('../settings').TEST_DB_URI;
const userFacade = require('../facades/userFacade');
const User = require('../models/user');

describe('User Facade Test', function() {
	before(async function() {
		await dbConnect(URI);
	});

	after(async function() {
		await mongoose.disconnect();
	});

	let users = [];

	beforeEach(async function() {
		await User.deleteMany({});
		users = await User.insertMany([
			{
				firstName: 'Bob',
				lastName: 'Man',
				userName: 'bm',
				password: 'test',
				email: 'a@b.c'
			},
			{
				firstName: 'Lotte',
				lastName: 'Woman',
				userName: 'lw',
				password: 'test',
				email: 'c@b.a'
			}
		]);
	});

	it('Should find a user by username', async function() {
		const user = await userFacade.findByUserName('bm');
		expect(user.firstName).to.be.equal('Bob');
	});

	it('Should find a user by id', async function() {
		const user = await userFacade.findById(users[0]._id);
		expect(user.firstName).to.be.equal('Bob');
	});

	it('Should get all users', async function() {
		const users = await userFacade.getAllUsers();
		expect(users.length).to.be.equal(2);
	});

	it('Should add a new user', async function() {
		const newUser = await userFacade.addUser('test', 'test', 'test', 'test', 'test@test.test');
		expect(newUser).to.not.be.null;
		expect(newUser.firstName).to.be.equal('test');
	});
});
