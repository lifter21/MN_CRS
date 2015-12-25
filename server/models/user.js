var mongoose = require('mongoose');
var crypto = require('crypto');

var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// var validateEmail = function(email) {
//     return emailRegex.test(email)
// };

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstname: {
	  type: String,
	  required: true
	},
	lastname: {
	  type: String,
	  required: true
	},
	email: {
		type: String,
		required: true,
		// validate: [validateEmail, 'Please fill a valid email address'],
		match: [emailRegex, 'Please fill a valid email address'],
		index: 1,
		lowercase: true
	},
	local: {
		name: {
	      type: String,
		  index: 1,
	      required: true
	    },
		passwordHash: String,
		passwordSalt: String
	},
	created: {type: Date, default: Date.now}
});

UserSchema.set("toJSON", {
	getters: true,
	virtuals: true
});

function hash(data) {
	return crypto
		.createHash('sha256')
		.update(data)
		.digest('hex');
};

UserSchema.methods = {
	validPassword: function(password) {
		return this.local.passwordHash === hash(this.local.passwordSalt + password);
	},
	setPassword: function(password) {
		var salt = "some data, hash or other string" + new Date() + Math.random();
		this.local.passwordSalt = hash(salt);
		this.local.passwordHash = hash(this.local.passwordSalt + password);
	}
};

UserSchema.virtual('local.password').set(function(password) {
	this.setPassword(password);
});

UserSchema.virtual('username').get(function() {
	return [this.firstname, this.lastname].join(' ');
});


module.exports = mongoose.model('User', UserSchema);