var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fieldSchema = Schema({
	masterkey: String,
	name: String,
	content: Schema.Types.Mixed,
	status: String 	// 'active if it is open'
					// 'archived if this field entry is not usedful anymore'
})

module.exports = {
	schema: fieldSchema
}