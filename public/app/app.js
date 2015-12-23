var app = angular.module('MyApp', ['ui.router', 'ngResource', 'ngSanitize'])
	.config(function($stateProvider, $urlRouterProvider) {
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