// create the controller and inject Angular's $scope
medApp.controller('homeController', homeController);

homeController.$inject = ['$scope', 'homeService'];

function homeController($scope, homeService) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
    homeService.getMedicamentosPagina({pagina:1}, function (response) {
        $scope.medicamentos = response;
    })
};