var mongoose = require('mongoose'); // Handling all DB related stuff
var express = require('express'); // Express and all its middleware
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var errorHandler = require('errorhandler');
var path = require('path');
var passport = require('passport'); // Auth module and its deps
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

// Main express config
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev')); // Logs reqs to console
app.use(bodyParser()); // Parses reqs and populates req.body
app.use(methodOverride()); // Allows PUT and DELETE in _method POST, to use app.put & app.delete
app.use(cookieParser('webinfluences2013'));
app.use(session());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
    app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}
if ('production' == env) {
    app.use(errorHandler());
}


// passport config
var Account = require('./models/Account').model;
passport.use(Account.createStrategy());
passport.use(new BearerStrategy(
  function(token, done) {
    Account.findOne({ tokens: token }, function (err, user) {
    	if (err) {
    		return done(err);
    	}
    	if (!user) {
    		return done(null, false);
    	}
    	return done(null, user);
    });
  }
));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Connect to the DB
mongoose.connect('mongodb://localhost:27017');
// Bind the connection on a var to do things with it
var db = mongoose.connection;
// Log errors
db.on('error', console.error.bind(console, 'connection error:'));
// What we do when we connect successfully
db.once('open', function callback () {
	// Notify that the connection is successful
	console.log('Connection to MongoDB database successfully established.');
});

// Include the router and pass it the express app
var index = require('./router')(app);

// Start the server on specified port
var server = app.listen(app.get('port'), function() {
	console.log('Listening on port %d', server.address().port);
});