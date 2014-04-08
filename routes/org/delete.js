var handleError = require('../../modules/handleError').response;
var Org = require('../../models/Org.js').model;

module.exports = function (req, res) {
	
	if (!req.body.deleteId) {
		res.send(404, 'Could not find the org to delete.');
		return;
	}

	Org.findOne({ _id: req.body.deleteId, admins: req.user._id }, function (err, docs) {
		if (err) return handleError(res, err, 8);
		if (!docs) {
			res.send(401, 'You are not allowed to delete this org.');
			return;
		}
		Org.findById(req.body.deleteId).remove(function (err, docs) {
			if (err) return handleError(res, err, 9);
			if (!docs) {
				res.send(500, 'Failed to delete the org.');
				return;
			}
			res.send(200, 'Org deleted successfully');
		});
	});	

}