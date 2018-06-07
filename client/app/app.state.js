angular.module('medApp').config(stateConfig);

stateConfig.$inject = ['$stateProvider'];

function stateConfig($stateProvider) {
    $stateProvider.state('app', {
        abstract: true,
        views: {
            'content@': {
                templateUrl: './components/homeView.html',
                controller: 'homeController',
            }
        }
    });
}