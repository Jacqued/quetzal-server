var passport = require('passport');
var async = require('async');

var handleError = require('./modules/handleError').response;

var Account = require('./models/Account').model;
var Org = require('./models/Org').model;
var Receiver = require('./models/Receiver').model;

var registerAccount = require('./routes/account/register');
var loginAccount = require('./routes/account/login');

var newOrg = require('./routes/org/new');
var listOrg = require('./routes/org/list');
var deleteOrg = require('./routes/org/delete');

var newReceiver = require('./routes/receivers/new');
var listReceiver = require('./routes/receivers/list');
var deleteReceiver = require('./routes/receivers/delete');


module.exports = function (app) {

	// Route to register a new user, using passport-local-mongoose builtin
	app.post('/register', registerAccount);

	// Route to log in and get a token, authenticated by passport-local
	// Issues token used for authentication by passport-bearer afterwards
	app.post('/login', passport.authenticate('local'), loginAccount);


	// To go beyond this point, you need to be authenticated by passport-bearer
	// We need to send this header :
	// Authorization : bearer ***token***
	//app.get('*', passport.authenticate('bearer', { session: false }));

	app.post('/orgs/new', passport.authenticate('bearer', { session: false }), newOrg);
	app.get('/orgs', passport.authenticate('bearer', { session: false }), listOrg);
	app.post('/orgs/delete', passport.authenticate('bearer', { session: false }), deleteOrg);

	app.post('/receivers/new', passport.authenticate('bearer', { session: false }), newReceiver);
	app.get('/receivers', passport.authenticate('bearer', { session: false }), listReceiver);
	app.post('/receivers/delete', passport.authenticate('bearer', { session: false }), deleteReceiver);

}