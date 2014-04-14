var passport = require('passport');

// All models need to be initialized before router actually is loaded
var Message = require('./models/Message').model;
var Account = require('./models/Account').model;
var Org = require('./models/Org').model;
var Receiver = require('./models/Receiver').model;


module.exports = function (app) {

	// Route to register a new user, using passport-local-mongoose builtin
	app.post('/register', require('./routes/account/register'));

	// Route to log in and get a token, authenticated by passport-local
	// Issues token used for authentication by passport-bearer afterwards
	app.post('/login', passport.authenticate('local'), require('./routes/account/login'));

	// To go beyond this point, you need to be authenticated by passport-bearer
	// We need to send this header :
	// Authorization : bearer ***token***
	app.use(passport.authenticate('bearer', { session: false }));

	app.use('/orgs', require('./routes/orgs'));

	app.use('/receivers', require('./routes/receivers'));

	app.use('/messages', require('./routes/messages'));

}