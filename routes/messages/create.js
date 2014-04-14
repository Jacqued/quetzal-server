var handleError = require('../../modules/handleError').response;
var Message = require('../../models/Message.js').model;

module.exports = function (req, res, next) {
	if (!req.body) {
		res.send(204, 'No content or malformed JSON');
		return;
	}
	// Remove non lowercase masterkeys from fields array
	for (i = 0; i < req.body.fields.length; i++) {
		if (!/^[a-z]*$/.test(req.body.fields[i].masterkey)) {
			res.send(400, 'Malformed request');
			return;
		}
	}
	Message.create({
		emitter: req.user._id,
		receiver: req.receiver._id,
		created: new Date(),
		lastupdate: new Date(),
		content: req.body.content,
		fields: req.body.fields
	}, function (err, instance) {
		if (err) return handleError(res, err, 24);
		req.receiver.messages.push(instance._id);
		req.receiver.save(function (err) {
			if (err) return handleError(res, err, 25);
			res.send(200, instance);
		})
	})
}