var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Org = new Schema({
	name: String,
	created: { type: Date, default: Date.now },
	lastupdate: { type: Date, default: Date.now },
	admins: [{type: Schema.Types.ObjectId, ref: 'Account'}],
	members: [{type: Schema.Types.ObjectId, ref: 'Account'}],
	receivers: [{type: Schema.Types.ObjectId, ref: 'Receiver'}]
});

module.exports = {
	schema: Org,
	model: mongoose.model('Org', Org)
}