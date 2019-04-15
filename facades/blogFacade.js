const Blog = require("../models/locationBlog");

function addBlog(info, img, pos, author) {
	return new Blog({ info, img, pos, author, lastUpdated: Date.now() }).save();
}

function getAllBlogs() {
	return Blog.find();
}

function findById(_id) {
	return Blog.findOne({ _id });
}

function likeBlog(userId, blogId) {
	return Blog.findOneAndUpdate({ _id: blogId }, { $push: { likedBy: userId } }, { new: true });
}

module.exports = {
	addBlog,
	getAllBlogs,
	findById,
	likeBlog
};
