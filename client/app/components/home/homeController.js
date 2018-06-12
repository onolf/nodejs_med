// create the controller and inject Angular's $scope
medApp.controller('homeController', homeController);

homeController.$inject = ['$scope', 'homeService', 'numUtils'];

function homeController($scope, homeService, numUtils) {
    var actualPage = 1;
    var totalPage = null;
    homeService.getMedicamentosPagina({pagina:1}, function (response) {
        $scope.medicamentos = response;
    });
    homeService.getMedicamentosTotal({}, function (response) {
        $scope.total = numUtils.formatMillisSeparator(response.total.toString());
        totalPage = Math.ceil(response.total / 10);
        $scope.totalPage = totalPage;
        buildPages(totalPage);
    });
    $scope.managePagination = function(event) {
        console.log("I have to work with pagination!");
        var page = $(event.target).attr("id");
        switch(page) {
            case "pag-tab-first": goToPage(1);
                break;
            case "pag-tab-last": goToPage(totalPage);
                break;
            default:
                var numPage = null;
                if(page.indexOf("pag-tab-") > -1) {
                    numPage = page.substr(8);
                    goToPage(numPage);
                }
        }
        function goToPage(targetPage){
            homeService.getMedicamentosPagina({pagina:targetPage}, function (response) {
                $scope.medicamentos = response;
            });
            var initialPage = 0;
            if(numPage >= 6 && numPage <= (totalPage - 6)) {
                $scope.pages = new Array();
                initialPage = numPage - 4;
                for(var i = initialPage; i < (initialPage + 10); i++) {
                    $scope.pages.push(i);
                }
            }
            if(targetPage == 1){
                buildPages(totalPage);
            }
            if(targetPage == totalPage){
                $scope.pages = new Array();
                initialPage = totalPage - 9;
                for(var i = initialPage; i < (initialPage + 10); i++) {
                    $scope.pages.push(i);
                }
            }
        }
    }

    function buildPages(totalPage){
        $scope.pages = new Array();
        if(totalPage >= 10) {
            for(var i = 1; i <= 10; i++) {
                $scope.pages.push(i);
            }
        }
    }
};