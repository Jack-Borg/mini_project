const expect = require("chai").expect;
const mongoose = require("mongoose");
const dbConnect = require("../dbConnect");
const URI = require("../settings").TEST_DB_URI;
const Blog = require("../models/locationBlog");
const blogFacade = require("../facades/blogFacade");

const userFacade = require("../facades/userFacade");
const User = require("../models/user");

describe("Blog Facade Test", function() {
	before(async function() {
		await dbConnect(URI);
	});

	after(async function() {
		await mongoose.disconnect();
	});

	let users = [];
	let blogs = [];

	beforeEach(async function() {
		await User.deleteMany();
		await Blog.deleteMany();
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
		blogs = await Blog.insertMany([
			{ info: "Test place 1", pos: { longitude: 26, latitude: 57 }, author: users[0]._id },
			{ info: "Test place 2", pos: { longitude: 30, latitude: 40 }, author: users[1]._id }
		]);
	});

	it("Should find a blog by id", async function() {
		const blog = await blogFacade.findById(blogs[0]._id);
		expect(blog.info).to.be.equal("Test place 1");
	});

	it("Should get all blogs", async function() {
		const blogs = await blogFacade.getAllBlogs();
		expect(blogs.length).to.be.equal(2);
		expect(blogs[0].info).to.be.equal("Test place 1");
		expect(blogs[1].info).to.be.equal("Test place 2");
	});

	it("Should like blog", async function() {
		await blogFacade.likeBlog(users[0]._id, blogs[0]._id);
		const blog = await blogFacade.likeBlog(users[1]._id, blogs[0]._id);
		expect(blog.likedBy.length).to.be.equal(2);
	});

	it("Should add new blog", async function() {
		const newBlog = await blogFacade.addBlog(
			"Added place",
			"test img",
			{ longitude: 10, latitude: 10 },
			users[0]._id
		);
		const getBlog = await blogFacade.findById(newBlog._id);
		expect(newBlog).to.not.be.null;
		expect(newBlog.info).to.be.equal(getBlog.info);
	});
});
