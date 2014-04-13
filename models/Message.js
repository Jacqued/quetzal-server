var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = Schema({
	emitter: {type: Schema.Types.ObjectId, ref: 'Account'}, 
	receiver: {type: Schema.Types.ObjectId, ref: 'Receiver'},
	date: { type: Date, default: Date.now },
	content: String,
	Type: String // This should be an type ObjectId
});

module.exports = {
	schema: messageSchema,
	model: mongoose.model('Message', messageSchema)
}