var express = require('express');
var router = express.Router();
var FB = require('fb');
var forever = require('forever-monitor');
var config = require('../../config.js');

var child = new(forever.Monitor)('node_modules/facebook-events-by-location/index.js', {
    max: 3,
    silent: true,
    options: []
});

child.on('exit', function() {
    console.log('FB.js has exited after 3 restarts');
});

child.start();

var accessToken;

FB.api('oauth/access_token', {
    client_id: config.app_id,
    client_secret: config.app_secret,
    grant_type: 'client_credentials'
}, function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }

    accessToken = res.access_token;
    console.log(accessToken);
});

router.get('/', function(req, res){
  console.log('access', accessToken);
  res.send(accessToken);
});

module.exports = router;
