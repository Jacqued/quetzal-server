var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Account = require('./Account').schema;

var Org = new Schema({
	name: String,
	created: Date,
	admins: [{type: Schema.Types.ObjectId, ref: 'Account'}],
	members: [{type: Schema.Types.ObjectId, ref: 'Account'}]
});

module.exports = {
	schema: Org,
	model: mongoose.model('Org', Org)
}