var handleError = require('../../modules/handleError').response;
var Message = require('../../models/Message.js').model;

module.exports = function (req, res, next) {
	if (!req.body) {
		res.send(204, 'No content or malformed JSON');
		return;
	}
	// Only if there actually is at least one field
	if (req.body.fields) {
		// Loop through fields in the message and ...
		for (i = 0; i < req.body.fields.length; i++) {
			// ... reject request if it contained a malformed field name
			if (!/^[a-z]*$/.test(req.body.fields[i].masterkey)) {
				res.send(400, 'Malformed request');
				return;
			}
			// ... mark field(s) as active as they have just been created
			req.body.fields[i].status = 'active'
		}
	}
		
	Message.create(new (function () { 			// Contorted syntax to created object 
		this.emitter = req.user._id;			// allows this.status to have access to
		this.receiver = req.receiver._id;		// the content of this.fields and thus
		this.created = new Date();				// check if it is empty.
		this.lastupdate = new Date();
		this.content = req.body.content;
		this.fields = req.body.fields;
		this.status = req.body.fields ? 'active' : 'published';
	})(), function (err, instance) {
		if (err) return handleError(res, err, 24);
		req.receiver.messages.push(instance._id);
		req.receiver.save(function (err) {
			if (err) return handleError(res, err, 25);
			res.send(200, instance);
		})
	})
}