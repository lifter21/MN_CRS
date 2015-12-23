app
	.factory('Login', function($resource) {
		return $resource('/api/login');
	})
	.factory('Logout', function($resource) {
		return $resource('/api/logout');
	})
	.factory('Me', function($resource) {
		return $resource('/api/users/me');
	})
	.factory('AuthService', function(Login, Logout, Me) {
		var self = {
			user: null,
			login: function(email, password) {
				return Login.save({
					email: email,
					password: password
				}).$promise.then(function(user) {
					console.log(user, ' logged in');
				}, function(err) {
					console.log('Login Error: ', err.data);
				});
			},
			logout: function() {
				return Logout.save().$promise.then(function(success) {
					console.log('Logged out: ', success);
				}, function(err) {
					console.log('Logout Error: ', err.data);
				});
			},
			isUser: function() {
				return !!self.user;
			},
			Me: function() {
				Me.get().$promise.then(function(user) {
					self.user = user;
				}, function(err) {
					console.log('Me get Error', err.data);
				})
			}
		};

		return self;
	})