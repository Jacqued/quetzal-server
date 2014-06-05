var pagination = require('mongoose-pagination');

var handleError = require('../../modules/handleError').response;
var Message = require('../../models/Message').model;
var Org = require('../../models/Org').model;

module.exports = function (req, res, next) {
	// Check for pagination
	// If no pagination send default request
	var page = (req.body.pagination) ? req.body.pagination : 1;

	Message.find(new (function () {				// Allow logic in object definition so we can
												// form the request depending on route (via req sub-objs)
												// and on pagination (if req contains it)
		
		if (req.receiver) { 		// Adjust request for receiver targeting
		
			// Just fetch messages as auth was handled by receiver main router
			this.receiver = req.receiver._id;

		} else if (req.org) {		// Adjust request for org targeting

			// Just fetch messages as auth was handled by org main router
			this['$or'] = [];
			for (i = 0; i < req.org.receivers.length; i++) {
				if (req.org.receivers[i]) {
					this['$or'].push({ receiver: req.org.receivers[i] });
				}
			}

		} else {					// Don't adjust if request is not targeted

			// Find orgs user has access to and list their receivers
			// Then get the last messages from all these receivers
			Org.find({ $or: [{ admins: req.user._id }, { members: req.user._id }] }, function (err, orgs) {
				if (err) return handleError(res, err, 32);
				if (!orgs) {
					res.send(204, 'You don\'t belong to any organization.');
					return;
				}

				this['$or'] = [];
				for (i = 0; i < orgs.length; i++) {
					if (orgs[i]) {
						for (j = 0; j > orgs[i].receivers.length; j++) {
							if (orgs[i].receivers[j]) {
								this['$or'].push({ receiver: orgs[i].receivers[j] });
							}
						}
					}
				}

			})

		}

	})())
		.paginate(page, 20)
		.exec(function (err, messages) {
			if (err) return handleError(res, err, 31);
			if (!messages) {
				res.send(204, 'No message corresponding to request.');
				return;
			}
			res.json(200, messages);
		});
}