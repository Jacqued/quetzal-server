var handleError = require('../../modules/handleError').response;
var Org = require('../../models/Org.js').model;

module.exports = function (req, res, next) { // Create a new organization
	// Create the actual organization
	if (!req.body.name) {
		res.send(400, 'BadRequest : no organization name found');
		return;
	}
	Org.create({
		name: req.body.name,
		admins: [req.user._id]
	}, function (err, instance) {
		if (err) return handleError(res, err, 5);
		// Add organization to user
		req.user.addOrg(instance._id, function (err, org, user) {
			if (err) return handleError(res, err, 6);
			// On success send a 201 and the actual org
			res.json(201, instance);
		});
	});
}