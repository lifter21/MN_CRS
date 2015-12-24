app
	.factory('UserRegistration', function($resource) {
		return $resource('/api/users/register');
	})
	// .factory('userService', function () {
	//
	// })
;