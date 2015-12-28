var app = angular.module('MyApp', ['ui.router', 'ngResource', 'ngSanitize'])
	.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

		$httpProvider.interceptors.push('HttpInterceptor');

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('app', {
				url: '',
				abstract: true,
				views: {
					'auth-panel': {
						controller: 'AuthPanelController',
						templateUrl: '/app/auth/authPanel.html'
					}
				}
			})
			.state('app.home', {
				url: '/',
				views: {
					'@': {
						templateUrl: '/app/home/home.html'
					}
				}
			})
			.state('app.registration', {
				url: '/registration',
				views: {
					'@': {
						controller: 'UserRegistrationController',
						templateUrl: '/app/userRegistration/registrationForm.html'
					}
				}
			})
			.state('app.login', {
				url: '/login',
				views: {
					'@': {
					controller: 'LoginController',
					templateUrl: '/app/auth/loginForm.html'
				}
			}
			})
			.state('app.logout', {
				url: '/logout',
				views: {
					'@': {
						controller: 'LogoutController'
					}
				}
			})
	})
	// .run(function($rootScope, AuthService) {
	// 	$rootScope.AuthService = AuthService;
	// 	$rootScope.AuthService.me();
	// })
	.factory('HttpInterceptor', function($q, $injector) {
		return {
			'responseError': function(rejection) {
				// do something on error
				if (rejection.status == 401) {
					return $injector.get('$state').go('app.login');
				}
				return $q.reject(rejection);
			}
		};
	});