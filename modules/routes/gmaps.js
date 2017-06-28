var express = require('express');
var router = express.Router();
var config = require('../../config.js');

gmapAccess = config.gmaps;

router.get('/', function(req, res){
  console.log('gmaps', gmapAccess);
  res.send(gmapAccess);
});

module.exports = router;
