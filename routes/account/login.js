var crypto = require('crypto');
var jwt = require('jwt-simple');

module.exports = function(req, res) {
	// Use node's crypto module to generate a random buffer, and use that as a secret to generate
	// a JWToken with the users username in it (later we may user something else)
	// Add this token to the user's token list
	req.user.addToken(jwt.encode({ username: req.user.username }, (function () {
		try {
			return crypto.randomBytes(256).toString('base64');
		}
		catch (ex) {
			throw ex;
		}
	})()), function (token) {
		// Then send it to the client app
		res.json(200, token);
	});
}