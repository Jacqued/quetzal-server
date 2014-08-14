var express = require('express');
var handleError = require('../../modules/handleError').response;
var Org = require('../../models/Org.js').model;

var router = express.Router();

// These routes don't need parameterized org
router.route('/')
	.get(require('./_list'))
	.put(require('./_create'))

// If :org param is present, set req.org to the right organization
router.param('org', function (req, res, next, id) {
	Org.findById(id, function (err, docs) {
		if (err) {
			return next(err);
		}
		else if (!docs) {
			res.send(404, 'Failed to find Org.');
			return;
		}
		req.org = docs;
		next();
	});
});

// Member Authorization
router.use('/:org', function (req, res, next) {
	if (req.org.admins.indexOf(req.user._id) === -1 && req.org.members.indexOf(req.user._id) === -1) {
		res.send(401, 'Unauthorized');
		return;
	} else {
		next();
	}
})

router.route('/:org')
	.get(require('./_get'))

router.route('/:org/messages')
	.get(require('../messages/_list')) 	// This route is here for API consistency

// Admin Authorization
router.use(function (req, res, next) {
	if (req.org.admins.indexOf(req.user._id) === -1) {
		res.send(401, 'Unauthorized');
	} else {
		next();
	}
})

router.route('/:org')
	.post(require('./_update'))
	.delete(require('./_delete'));


module.exports = router;