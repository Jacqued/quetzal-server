var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fieldSchema = Schema({
	masterkey: String,
	name: String,
	content: Schema.Types.Mixed
})

module.exports = {
	schema: fieldSchema
}