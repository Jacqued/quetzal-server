var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var receiverSchema = mongoose.Schema({
	name: String,
	active: Boolean,
	owner: {type: Schema.Types.ObjectId, ref: 'Org'},
	description: String,
	created: { type: Date, default: Date.now },
	supportedTypes: String // Array of the ObjectIds of all supported types
});

module.exports = {
	schema: receiverSchema,
	model: mongoose.model('Receiver', receiverSchema)
}