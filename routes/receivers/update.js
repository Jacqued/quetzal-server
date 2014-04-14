var handleError = require('../../modules/handleError').response;
var Receiver = require('../../models/Receiver').model;

module.exports = function (req, res, next) {
	// Address absence of changes
	if (!req.body) {
		res.send(204, 'No changes');
		return;
	}
	// Assign new values to keys
	for (key in req.body) {
		if (key !== '_id' && key !== owner && key !== created && key !== lastupdate && key !== messages) {
			req.receiver[key] = req.body[key];
		}
	}
	req.receiver.lastupdate = new Date();
	req.receiver.save(function (err, docs) {
		if (err) return handleError(res, err, 23); // Probably tried to add a nonexistent property
		res.send(200, docs);
		return;
	});
}