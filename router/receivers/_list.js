var handleError = require('../../modules/handleError').response;
var Org = require('../../models/Org').model;

module.exports = function (req, res) {
	Org.find({ $or: [{ admins: req.user._id }, { members: req.user._id }] })
	   .populate({
	   		path: 'receivers',
	   		match: { active: true }
	   })
	   .exec(function (err, docs) {
	   		if (err) return handleError(res, err, 11);
	   		res.json(200, docs);
	   })
}