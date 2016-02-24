'use strict';

angular.module('confusionApp', ['ui.router', 'ngResource'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        // router for the home page
            .state('app', {
                url: '/',
                views: {
                    'header': {
                        templateUrl: 'views/header.html'
                    },
                    'content': {
                        templateUrl: 'views/home.html',
                        controller: 'IndexController'
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                }
            })
            //route for the aboutus page
            .state('app.aboutus', {
                url: 'aboutus',
                views: {
                    'content@': {
                        templateUrl: 'views/aboutus.html',
                        controller: 'AboutController'
                    }
                }
            })
            //route for the contactus page
            .state('app.contactus', {
                url: 'contactus',
                views: {
                    'content@': {
                        templateUrl: 'views/contactus.html',
                        controller: 'ContactController'
                    }

                }
            })
            //route for the menue page
            .state('app.menu', {
                url: 'menu',
                views: {
                    'content@': {
                        templateUrl: 'views/menu.html',
                        controller: 'MenuController'
                    }

                }
            })
            //route for the dishdetails page
            .state('app.dishdetails', {
                url: 'menu/:id',
                views: {
                    'content@': {
                        templateUrl: 'views/dishdetails.html',
                        controller: 'DishDetailController'
                    }

                }
            });
        $urlRouterProvider.otherwise('/');

    })