// Require internal mods
var Message = require('../models/Message.js');

var success = new Message ({
	emitter: 'Mehdi',
	receiver: 'Project qontrol-server',
	date: new Date(),
	content: 'First message successfully created',
	Type: 'creation'
})

console.log('And the Winner is : ' + success.emitter);

success.save(function (err, success) {
	if (err) {
		return console.error(err);
	}
	console.log('Message from Mehdi successfully saved.');

	Message.find({
		emitter: 'Mehdi'
	}, function (err, result) {
		if (err) {
			return console.error(err);
		}
		console.log(result);
	});

})