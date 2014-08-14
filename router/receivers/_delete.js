var handleError = require('../../modules/handleError').response;
var Receiver = require('../../models/Receiver').model;
var Org = require('../../models/Org').model;

module.exports = function (req, res) {
	Receiver.findById(req.receiver._id)
		.remove(function (err, docs) {
			if (err) return handleError(res, err, 13);
			if (!docs) {
				res.send(500, 'Could not delete receiver.');
				return;
			}
			Org.findOne({ receivers: req.receiver._id }, function (err, docs) {
				if (!docs) {
					console.log('Failed to remove receiver ' + req.receiver._id + 'from its Org.')
					res.send(200, 'Receiver successfully deleted');
					return;
				}
				docs.receivers.splice(docs.receivers.indexOf(req.receiver._id));
				docs.save(function (err) {
					if (err) return handleError(res, err, 22);
					res.send(200, 'Receiver successfully deleted.');
				}); 
			}); 
		});
}