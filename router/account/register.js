var handleError = require('../../modules/handleError').response;
var Account = require('../../models/Account').model;

module.exports = function (req, res) {
	if (req.body.username && req.body.password) {
		Account.register(new Account({ username: req.body.username }), req.body.password, function (err, account) {
			if (err) return handleError(res, err, 10);
			res.send(201, 'User successfully created.');
		})
	}
}