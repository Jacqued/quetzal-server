var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var receiverSchema = mongoose.Schema({
	name: String,
	active: Boolean,
	owner: { type: Schema.Types.ObjectId, ref: 'Org' },
	description: String,
	created: { type: Date, default: Date.now },
	messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
});

module.exports = {
	schema: receiverSchema,
	model: mongoose.model('Receiver', receiverSchema)
}