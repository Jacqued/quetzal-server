var handleError = require('../../modules/handleError').response;
var Receiver = require('../../models/Receiver').model;

module.exports = function (req, res) {
	Receiver.findById(req.receiver._id)
		.remove(function (err, docs) {
			if (err) handleError(res, err, 13);
			if (!docs) {
				res.send(500, 'Could not delete receiver.');
				return;
			}
			res.send(200, 'Receiver successfully deleted.');
		});
}