const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationBlogSchema = new Schema({
	info: { type: String, required: true },
	img: String,
	pos: {
		longitude: { type: Number, required: true },
		latitude: { type: Number, required: true }
	},
	author: { type: Schema.Types.ObjectId, ref: "User", required: true },
	likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
	created: { type: Date, default: Date.now },
	lastUpdated: Date
});

LocationBlogSchema.virtual("likedByCount").get(function(next) {
	return this.likedBy.length;
});

LocationBlogSchema.pre("update", function(next) {
	this.update({}, { $set: { lastUpdated: new Date() } });
	next();
});

const LocationBlog = mongoose.model("locationBlog", LocationBlogSchema);

module.exports = LocationBlog;
