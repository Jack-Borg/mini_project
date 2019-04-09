const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
	type: String,
	company: String,
	companyUrl: String
});

const UserSchema = new Schema({
	firstName: String,
	lastName: String,
	userName: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	job: [JobSchema],
	created: { type: Date, default: Date.now },
	lastUpdated: Date
});

UserSchema.pre('save', function(next) {
	this.password = 'Hash please and add some salt' + this.password;
	next();
});
UserSchema.pre('update', function(next) {
	this.update({}, { $set: { lastUpdated: new Date() } });
	next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
