var handleError = require('../../modules/handleError').response;
var Org = require('../../models/Org.js').model;

module.exports = function (req, res) {
	// Handle lack of POST data
	if (!req.body.name) {
		res.send(400, 'BadRequest : no organization name found');
		return;
	}
	// Create the actual organization
	Org.create({
		name: req.body.name,
		admins: [req.user._id]
	}, function (err, instance) {
		if (err) return handleError(res, err, 5);
		// Add organization to user
		req.user.addOrg(instance._id, function (err, org, user) {
			if (err) return handleError(res, err, 6);
			res.send(201, 'Organization successfully created');
		});
	});
}