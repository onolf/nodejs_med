// create the controller and inject Angular's $scope
medApp.controller('homeController', homeController);

homeController.$inject = ['$scope', 'homeService', 'numUtils'];

function homeController($scope, homeService, numUtils) {
    var actualPage = 1;
    homeService.getMedicamentosPagina({pagina:1}, function (response) {
        $scope.medicamentos = response;
    });
    homeService.getMedicamentosTotal({}, function (response) {
        $scope.total = numUtils.formatMillisSeparator(response.total.toString());
    });
    $scope.managePagination = function(event) {
        console.log("I have to work with pagination!");
        var page = $(event.target).html();
        switch(page) {
            case "pag-tab-previous": 
                if(actualPage > 1) {
                    goToPage(actualPage-1);
                }
                break;
            case "pag-tab-next":
                break;
            default:
                var page = null;
                if(page.indexOf("pag-tab-") > -1) {
                    page = page.substr(8);
                }
        }
        function goToPage(targetPage){

        }
    }
};