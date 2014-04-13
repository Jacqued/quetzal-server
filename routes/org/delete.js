var handleError = require('../../modules/handleError').response;
var Org = require('../../models/Org.js').model;

module.exports = function (req, res, next) {
	Org.findById(req.org._id)
	   .remove(function (err, docs) {
		if (err) return handleError(res, err, 8);
		if (!docs) {
			res.send(500, 'Failed to delete the org.');
			return;
		}
		res.send(200, 'Org deleted successfully');
	});	
}