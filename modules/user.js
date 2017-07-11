var mongoose = require('mongoose');

// mongoose.connect('localhost:27017/dateData');
mongoose.connect('mongodb://heroku_997333rh:o2qq0epsf7hgceb7d9rufh0h7u@ds051170.mlab.com:51170/heroku_997333rh');

var userSchema = new mongoose.Schema({
	username: String,
	password: String
});

var userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;
