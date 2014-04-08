var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var receiverSchema = mongoose.Schema({
	name: String,
	owner: {type: Schema.Types.ObjectId, ref: 'Org'},
	description: String,
	created: Date,
	supportedTypes: String // Array of the ObjectIds of all supported types
});

module.exports = {
	schema: receiverSchema,
	model: mongoose.model('Receiver', receiverSchema)
}