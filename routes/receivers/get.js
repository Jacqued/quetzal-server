var Receiver = require('../../models/Receiver.js').model;
var handleError = require('../../modules/handleError.js');

module.exports = function (req, res, next) {
	Receiver.findById(req.receiver._id)
		.populate('owner')
		.populate('messages')
		.exec(function (err, docs) {
			if (err) return handleError(res, err, 21);
	   		res.json(200, docs);
		})
}