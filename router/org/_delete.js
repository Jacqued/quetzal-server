var handleError = require('../../modules/handleError').response;
var Org = require('../../models/Org').model;
var Account = require('../../models/Account').model;

module.exports = function (req, res, next) {
	Org.findById(req.org._id)
	   .remove(function (err, docs) {
		if (err) return handleError(res, err, 8);
		if (!docs) {
			res.send(500, 'Failed to delete the org.');
			return;
		}
		Account.findOne({ orgs: req.org._id }, function (err, docs) {
				if (!docs) {
					console.log('Failed to remove org ' + req.org._id + 'from its Account.')
					res.send(200, 'Org successfully deleted');
					return;
				}
				docs.orgs.splice(docs.orgs.indexOf(req.org._id));
				docs.save(function (err) {
					if (err) return handleError(res, err, 22);
					res.send(200, 'Org successfully deleted.');
				}); 
			}); 
	});	
}