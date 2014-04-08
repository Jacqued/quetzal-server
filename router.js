var passport = require('passport');
var async = require('async');

var Account = require('./models/Account').model;
var Org = require('./models/Org').model;

var registerAccount = require('./routes/account/register');
var loginAccount = require('./routes/account/login');

var newOrg = require('./routes/org/new');
var listOrg = require('./routes/org/list');
var deleteOrg = require('./routes/org/delete');


module.exports = function (app) {

	// Route to register a new user, using passport-local-mongoose builtin
	// Needs POST with username and password in the body
	app.post('/register', registerAccount);

	// Route to log in and get a token, authenticated by passport-local
	// Needs POST with username and password in the body
	app.post('/login', passport.authenticate('local'), loginAccount);

	// To go beyond this point, you need to be authenticated by passport-bearer
	// We need to send this header :
	// Authorization : bearer ***token***
	//app.get('*', passport.authenticate('bearer', { session: false }));

	// Create a new organization
	// Needs POST with name in the body
	app.post('/orgs/new', passport.authenticate('bearer', { session: false }), newOrg);

	// List all organizations you are admin or member of
	// Needs nothing
	app.get('/orgs', passport.authenticate('bearer', { session: false }), listOrg);

	// Delete an organization if you're an admin
	// Needs POST with deleteId in the body
	app.post('/orgs/delete', passport.authenticate('bearer', { session: false }), deleteOrg);

}