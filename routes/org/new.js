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
		if (err) {
			res.send(500, 'Unable to create new organization : ' + err);
			return;
		}
		req.user.addOrg(instance._id, function (err, org, user) {
			if (err) {
				res.send(500, 'Unable to attribute organization : ' + err);
				return;
			}
			res.send(201, 'Organization successfully created');
		});
	});
}