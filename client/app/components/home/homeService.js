medApp.factory('homeService', homeService);

homeService.$inject = ['path', '$resource'];

function homeService(path, $resource) {
    var urlAPI = path.BASE;

    return $resource(urlAPI, null,
    {        
        getMedicamentosPagina: {
            method: 'GET',
            url: urlAPI + path.medicamentos,
            params: {
                'pagina' : '@pagina'
            },
            isArray: true
        },
        getMedicamentosTotal: {
            method: 'GET',
            url: urlAPI + path.medicamentosTotal,
            params: {},
            isArray: false
        }
    });
}
