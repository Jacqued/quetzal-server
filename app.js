// Require external deps
var express = require('express');
var mongoose = require('mongoose');
var http = require('http')
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

// Main express config
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('webinfluences2013'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

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