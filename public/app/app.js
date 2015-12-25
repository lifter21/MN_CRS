var app = angular.module('MyApp', ['ui.router', 'ngResource', 'ngSanitize'])
	.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

		$httpProvider.interceptors.push('HttpInterceptor');

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: '/app/home/home.html'
			})
			.state('registration', {
				url: '/registration',
				controller: 'UserRegistrationController',
				templateUrl: '/app/user/registrationForm.html'
			})
			.state('login', {
				url: '/login',
				controller: 'LoginController',
				templateUrl: '/app/auth/loginForm.html'
			})
			.state('logout', {
				url: '/logout',
				controller: 'LogoutController'
			})
	})
	.run(function($rootScope, AuthService) {
		$rootScope.AuthService = AuthService;
		$rootScope.AuthService.me();
	})
	.factory('HttpInterceptor', function($q, $injector) {
		return {
			'responseError': function(rejection) {
				// do something on error
				if (rejection.status == 401) {
					return $injector.get('$state').go('login');
				}
				return $q.reject(rejection);
			}
		};
	})
	;