var handleError = require('../../modules/handleError').response;
var Org = require('../../models/Org.js').model;

module.exports = function (req, res, next) {
	Org.findById(req.org._id)
	   .populate('admins')
	   .populate('members')
	   .populate('receivers')
	   .exec(function (err, docs) {
	   		if (err) return handleError(res, err, 14);
	   		res.json(200, docs);
	   });
}