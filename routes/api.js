const express = require("express");
const router = express.Router();
const userFacade = require("../facades/userFacade");
const loginFacade = require("../facades/loginFacade");
const blogFacade = require("../facades/blogFacade");

router.post("/login", async function(req, res, next) {
	const { username, password, longitude, latitude, distance } = req.body;
	const response = await loginFacade.login(username, password, longitude, latitude, distance);
	res.statusCode = response.statusCode;
	// res.json({ user: response.user, friends: response.friends, msg: response.msg });
	res.json(({ user, friends, msg } = response));
});

router.get("/user/all", async function(req, res, next) {
	res.statusCode = 200;
	res.json({ users: await userFacade.getAllUsers() });
});

router.get("/user/username", async function(req, res, next) {
	const { username } = req.body;
	res.json({ user: await userFacade.findByUsername(username) });
});

router.get("/user/id", async function(req, res, next) {
	const { id } = req.body;
	res.json({ user: await userFacade.findById(id) });
});

router.post("/user/add", async function(req, res, next) {
	const { firstName, lastName, username, password, email } = req.body;
	res.json({ user: userFacade.addUser(firstName, lastName, username, password, email) });
});

router.get("/user/reset", async function(req, res, next) {
	userFacade.makeUsers();
	res.json("users reset");
});

router.get("/blog/all", async function(req, res, next) {
	res.json({ blogs: await blogFacade.getAllBlogs() });
});

router.get("/blog/id", async function(req, res, next) {
	const { id } = req.body;
	res.json({ blog: await blogFacade.findById(id) });
});

router.post("/blog/add", async function(req, res, next) {
	const { info, img, pos, author } = req.body;
	res.json({ blog: await blogFacade.addBlog(info, img, pos, author) });
});

router.post("/blog/like", async function(req, res, next) {
	const { userId, blogId } = req.body;
	res.json({ blog: await blogFacade.likeBlog(userId, blogId) });
});

module.exports = router;
