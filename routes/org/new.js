var handleError = require('../../modules/handleError').response;
var Org = require('../../models/Org.js').model;

module.exports = function (req, res) {
	if (!req.body.name) {
		res.send(400, 'BadRequest : no organization name found');
		return;
	}
	Org.create({
		name: req.body.name,
		admins: [req.user._id]
	}, function (err, instance) {
		if (err) return handleError(res, err, 5);
		req.user.addOrg(instance._id, function (err, org, user) {
			if (err) return handleError(res, err, 6);
			res.send(201, 'Organization successfully created');
		});
	});
}