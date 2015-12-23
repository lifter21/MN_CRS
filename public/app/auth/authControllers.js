app
	.controller('LoginController', function($scope, $state, AuthService) {
		$scope.user = {};
		$scope.login = function() {
			AuthService.login($scope.user.email, $scope.user.password)
				.then(function(user) {
					$state.go('home');
				}, function(err) {
					$scope.formErrors = err.data;
				})
		};
	})
	.controller('LogoutController', function($scope, $state, AuthService) {
		AuthService.logout().then(function() {
			$state.go('login');
		}, function(err) {

		})
	})
	;