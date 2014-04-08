var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Org = new Schema({
	name: String,
	created: Date,
	admins: [{type: Schema.Types.ObjectId, ref: 'Account'}],
	members: [{type: Schema.Types.ObjectId, ref: 'Account'}],
	receivers: [{type: Schema.Types.ObjectId, ref: 'Receiver'}]
});

module.exports = {
	schema: Org,
	model: mongoose.model('Org', Org)
}