var handleError = require('../../modules/handleError').response;

var Receiver = require('../../models/Receiver').model;

module.exports = function (req, res) {
	
	// Handle lack of POST data
	if (!req.body.deleteId) {
		res.send(404, 'Could not find the receiver to delete.');
		return;
	}

	Receiver.findById(req.body.deleteId)
			.populate('owner')
			.exec(function(err, docs) {
				// Handle error
				if (err) return handleError(res, err, 12);
				// Handle lack of admin rights on owner org
				if (docs.owner.admins.indexOf(req.user._id) === -1) {
					res.send(401, 'You do not have sufficient rights to perform this action.');
					return;
				}
				// Handle error
				docs.remove(function (err, docs) {
					if (err) handleError(res, err, 13);
					if (!docs) {
						res.send(500, 'Could not delete receiver.');
						return;
					}
					res.send(200, 'Receiver successfully deleted.');
				});
			});

}