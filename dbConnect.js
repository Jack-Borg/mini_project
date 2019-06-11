const mongoose = require("mongoose");

function connect(connectionString) {
	mongoose.set("useNewUrlParser", true);
	mongoose.set("useCreateIndex", true);
	mongoose.set("useFindAndModify", false);
	return mongoose.connect(connectionString);
}

mongoose.connection.on("connected", function() {
	console.log("Mongoose default connection open ");
});
mongoose.connection.on("disconnected", function() {
	console.log("Mongoose connection closed ");
});
mongoose.connection.on("error", function(err) {
	console.log("Mongoose default connection error: " + err);
});

module.exports = connect;
