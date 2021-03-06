module.exports = function(passport) {

	var LocalStrategy = require('passport-local').Strategy;
	var User = require('../models/user');

	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, '-local.passwordHash -local.passwordSalt', function(err, user) {
			done(err, user);
		})
	});

	passport.use(new LocalStrategy(function(username, password, done) {
		var query = {
			$or: [{
				'email': username
			}, {
				'local.name': username
			}]
		};
		User.findOne(query, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user || !user.validPassword(password)) {
				return done(null, false, {
					message: 'Incorrect login data.'
				});
			}
			return done(null, user);
		})
	}));
};