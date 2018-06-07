angular.module('medApp').config(stateConfig);

stateConfig.$inject = ['$stateProvider'];

function stateConfig($stateProvider) {
    $stateProvider.state('solicitar', {
        parent: 'app',
        url: 'prueba',
        data: {
            authorities: []
        },
        views: {
            'content@': {
                templateUrl: './components/homeView.html',
                controller: 'homeController',
                // controllerAs: 'vm'
            }
        },
        params: {}
    });
}
