var Account = require('../../models/Account').model;

module.exports = function (req, res) {
	if (req.body.username && req.body.password) {
		Account.register(new Account({ username: req.body.username }), req.body.password, function (err, account) {
			if (err) {
				res.send(400, err);
			} else {
				res.send(201, 'User successfully created.');
			}
		})
	}
}