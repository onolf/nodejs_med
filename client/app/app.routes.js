// // configure our routes
// angular.module('medApp').config(function ($routeProvider) {
//     $routeProvider

//         // route for the home page
//         .when('/', {
//             templateUrl: './components/homeView.html',
//             controller: 'homeController'
//         })

//         // route for the about page
//         .when('/about', {
//             templateUrl: 'pages/about.html',
//             controller: 'aboutController'
//         })

//         // route for the contact page
//         .when('/contact', {
//             templateUrl: 'pages/contact.html',
//             controller: 'contactController'
//         });
// });

medApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: '/app/components/home/homeView.html',
            controller: 'homeController'
        });

        // // nested list with custom controller
        // .state('home.list', {
        //     url: '/list',
        //     templateUrl: 'partial-home-list.html',
        //     controller: function ($scope) {
        //         $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
        //     }
        // })

        // // nested list with just some random string data
        // .state('home.paragraph', {
        //     url: '/paragraph',
        //     template: 'I could sure use a drink right now.'
        // })

        // // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        // .state('about', {
        //     url: '/about',
        //     views: {
        //         '': { templateUrl: 'partial-about.html' },
        //         'columnOne@about': { template: 'Look I am a column!' },
        //         'columnTwo@about': {
        //             templateUrl: 'table-data.html',
        //             controller: 'scotchController'
        //         }
        //     }

        // });

});