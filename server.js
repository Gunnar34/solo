var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var pg = require( 'pg' );
var port = process.env.PORT || 4555;
var facebook = require('./modules/routes/facebook');
var gmap = require('./modules/routes/gmaps');
var register = require('./modules/routes/register');
var login = require('./modules/routes/login');
var events = require('./modules/routes/events');

app.use('/events', events);
app.use('/login', login);
app.use('/register', register);
app.use( '/access', facebook);
app.use( '/gmap', gmap);
app.use( express.static( 'public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.listen( port, function(){
  console.log('server 4555');
});

app.get('/', function(req, res){
  console.log('URL hit');
  res.sendFile( path.resolve( 'public/view/index.html' ) );
});
