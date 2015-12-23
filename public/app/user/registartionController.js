app
	.controller('UserRegistrationController', function($scope, $state, UserRegistration) {
		$scope.user = new UserRegistration();

		$scope.register = function() {
			$scope.user.$save().then(function(user) {
				console.log(user, ' Successfully registered');
				$state.go('login')
			}, function(err) {
				console.log('Registration Error: ', err.data);
				$scope.formErrors = err.data;
			})
		}
	})