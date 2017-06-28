var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var pg = require( 'pg' );
var port = process.env.PORT || 4555;

app.use( express.static( 'public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.listen( port, function(){
  console.log('server 4555');
});

app.get('/', function(req, res){
  console.log('URL hit');
  res.sendFile( path.resolve( 'public/view/index.html' ) );
});

app.get('/gettingStarted', function(req, res){
  console.log('URL hit');
  res.sendFile( path.resolve( 'public/view/gettingStarted.html' ) );
});
