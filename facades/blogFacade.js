const Blog = require("../models/locationBlog");

function addBlog({ info, img, longitude, latitude, author }) {
	const pos = { longitude, latitude };
	return new Blog({ info, img, pos, author, lastUpdated: Date.now() }).save();
}

function getAllBlogs() {
	return Blog.find();
}

function findById(_id) {
	return Blog.findOne({ _id });
}

function findByAuthorId(author) {
	console.log(author);
	const b = Blog.findOne({ author });
	// console.log(b);
	return b;
	// throw Error("no work");
}

function likeBlog(userId, blogId) {
	return Blog.findOneAndUpdate({ _id: blogId }, { $push: { likedBy: userId } }, { new: true });
}

module.exports = {
	addBlog,
	getAllBlogs,
	findById,
	findByAuthorId,
	likeBlog
};
