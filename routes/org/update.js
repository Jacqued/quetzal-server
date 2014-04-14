var handleError = require('../../modules/handleError').response;
var Org = require('../../models/Org.js').model;

module.exports = function (req, res, next) {
	// Address absence of changes
	if (!req.body) {
		res.send(204, 'No changes');
		return;
	}
	// Assign new values to keys
	for (key in req.body) {
		if (key !== '_id') {
			console.log(key + ' - ' + req.org[key]);
			req.org[key] = req.body[key];
		}
	}
	req.org.save(function (err, docs) {
		if (err) return handleError(res, err, 23); // Probably tried to add a nonexistent property
		res.send(200, docs);
		return;
	});
}