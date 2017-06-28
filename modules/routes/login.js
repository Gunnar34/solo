var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('../user');
var bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/', function(req, res) {
	console.log('base url post hit:', req.body);
	// connect to db?
	user.findOne({
		username: req.body.username
	}, function(err, user) {
		if (err) {
			// err connecting
			console.log('find user error:', err);
			res.sendStatus(400);
		} // end error
		else {
			// connected
			// find user
			if (user !== undefined) {
				// user found, compare raw text to hash
				console.log('comparing:', req.body.password, user.password);
				bcrypt.compare(req.body.password, user.password, function(err, success) {
					if (err) {
						// error with bcrypt
						console.log('error:', err);
						res.sendStatus(400);
						}
					else {
						// no error with bcrypt
						console.log('user match');
						if (success) {
							var objectToSend = {
								username: req.body.username,
								userID: user._id
							};
							res.send(objectToSend);
							}
						else {
							res.send('error?');
							}
					}
				}); //end compare
			} //end found user
			else {
				console.log('no user found');
				res.send(400);
			}
		} // end no error
	}); //end looking for user
});

module.exports = router;
