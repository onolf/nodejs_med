angular.module('medApp').factory('numUtils', numUtils);

numUtils.$inject = [];

function numUtils() {
    return {
        formatMillisSeparator: formatMillisSeparator
    }
    function formatMillisSeparator(input) {
        var num = input.replace(/\./g, '');
        if (!isNaN(num)) {
            num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            num = num.split('').reverse().join('').replace(/^[\.]/, '');
            input = num;
            return input;
        } else {
            console.err('Solo se permiten numeros');
            input = input.replace(/[^\d\.]*/g, '');
        }
        return null;
    }
}