var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Field = require('./Field').schema;

var messageSchema = Schema({
	emitter: {type: Schema.Types.ObjectId, ref: 'Account'}, 
	receiver: {type: Schema.Types.ObjectId, ref: 'Receiver'},
	created: { type: Date, default: Date.now },
	lastupdate: { type: Date, default: Date.now },
	content: String,
	fields: [Field]
});

module.exports = {
	schema: messageSchema,
	model: mongoose.model('Message', messageSchema)
}