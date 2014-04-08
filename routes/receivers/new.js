var handleError = require('../../modules/handleError').response;

var Org = require('../../models/Org').model;
var Receiver = require('../../models/Receiver').model;

module.exports = function (req, res) {
	// Handle missing receiver name in request
	if (!req.body.name) {
		res.send(400, 'Could not retrieve name of new receiver.');
		return;
	}
	Org.findById(req.body.parentOrg, function (err, docs) {
		if (err) return handleError(res, err, 1);
		// Handle wrong organization _id
		if (!docs) {
			res.send(400, 'Could no find parent organization.');
			return;
		}
		Org.findOne({ _id: req.body.parentOrg, admins: req.user._id }, function (err, docs) {
			if (err) return handleError(res, err, 2);
			// Handle user not admin of the overarching organization
			if (!docs) {
				res.send(401, 'You are not an admin of selected organization.');
				return;
			}
			// Finally create the actual receiver and save it to database
			Receiver.create({
				name: req.body.name,
				active: true,
				owner: req.body.parentOrg
			}, function (err, instance) {
				if (err) return handleError(res, err, 3);
				docs.receivers.push(instance)
				docs.save(function (err) {
					if (err) return handleError(res, err, 4);
					res.send(200, 'Receiver succesfully created.');
				});
			});
		});
	});
}