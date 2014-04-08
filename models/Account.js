var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
	nickname: String,
	email: String,
	created: Date,
	orgs: [{type: Schema.Types.ObjectId, ref: 'Org'}],
	tokens: [String]
});

Account.methods.addToken = function (token, cb) {
	this.tokens.push(token);
	this.save();
	if (cb) {
		cb(token);
	}
}

Account.methods.addOrg = function (orgId, cb) {
	this.orgs.push(orgId);
	this.save();
	if (cb) {
		cb(null, orgId, this.username);
	}

}

Account.plugin(passportLocalMongoose);

module.exports = {
	schema: Account,
	model: mongoose.model('Account', Account)
}