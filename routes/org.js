var express = require('express');
var handleError = require('../modules/handleError').response;
var Org = require('../models/Org.js').model;

var router = express.Router();

// These routes don't need parameterized org
router.route('/')
	.get(require('./org/_list'))
	.put(require('./org/create'))

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
	.get(require('./org/get'));


// Admin Authorization
router.use(function (req, res, next) {
	if (req.org.admins.indexOf(req.user._id) === -1) {
		res.send(401, 'Unauthorized');
	} else {
		next();
	}
})

router.route('/:org')
	.delete(require('./org/delete'));


module.exports = router;