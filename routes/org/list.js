var Org = require('../../models/Org').model;

module.exports = function (req, res) {
	Org.find({ $or: [{ admins: req.user._id }, { members: req.user._id }] }, function (err, orgs) {
		if (err) {
			res.send(500, 'Unable to find organizations : ' + err);
			return;
		}
		if (!orgs) {
			res.send(204, 'No Content : User does not belong to any orgs.');
			return;
		}
		res.json(200, orgs);
	})
}