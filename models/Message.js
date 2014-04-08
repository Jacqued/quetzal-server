var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var messageSchema = Schema({
	emitter: {type: Schema.Types.ObjectId, ref: 'Account'}, 
	receiver: {type: Schema.Types.ObjectId, ref: 'Receiver'},
	date: Date,
	content: String,
	Type: String // This should be an type ObjectId
});

module.exports = mongoose.model('Message', messageSchema);