var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  console.log('Base URL hit');
  res.sendFile( path.resolve( 'view/index.html' ) );
});

module.exports = router;
