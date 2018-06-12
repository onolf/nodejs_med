angular.module('medApp').factory('path', path);

path.$inject = [];

function path() {
    return {
        BASE: "http://localhost:8888",
        medicamentos: "/medicamentos",
        medicamentosTotal: "/medicamentos/total"
    }
}
