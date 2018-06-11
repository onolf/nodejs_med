var querystring = require("querystring");

var http = require("http");
var url = require("url");

var urlSource = "http://localhost:3000";

// function iniciar(response, postData) {
//     console.log("Manipulador de peticion 'iniciar' ha sido llamado.");

//     var body = '<html>' +
//         '<head>' +
//         '<meta http‐equiv="Content‐Type" content="text/html; charset = UTF‐8" />' +
//         '</head>' +
//         '<body>' +
//         '<form action="/subir" method="post">' +
//         '<textarea name="text" rows="20" cols="60"></textarea>' +
//         '<input type="submit" value="Enviar texto" />' +
//         '</form>' +
//         '</body>' +
//         '</html>';
//     response.writeHead(200, { "Content-Type": "text/html" });
//     response.write(body);
//     response.end();
// }
// function subir(response, dataPosteada) {
//     console.log("Manipulador de peticion 'subir' ha sido llamado.");
//     response.writeHead(200, { "Content-Type": "text/html" });
//     response.write("Tu enviaste texto: " + querystring.parse(dataPosteada)["text"]);
//     response.end();
// }

function medicamentos(response, query) {
    // query : pagina={numero-pagina}
    try {
        var queryStrings = query.split("&");
        var pairQueryStrings = queryStrings.map(function (element) {
            return element.split("=");
        });
        console.log(pairQueryStrings);

        // retorna el valor de la pagina solicitada
        var pagina = pair("pagina");
        var total = pair("total");

        function pair(key) {
            return pairQueryStrings.find(function (pair) {
                if (pair[0] === key) {
                    return pair;
                }
            })[1];
        }
    } catch (e) {
        console.error(e.message);
    }
    // from GET -> http://localhost:8888/medicamentos?pagina={pagina}
    // to GET -> http://localhost:3000/medicamentos?_page={pagina}
    if (pagina) {
        var urlMedicamentosPagina = urlSource + "/medicamentos?_page=" + pagina;
        console.log("Request a: " + urlMedicamentosPagina);
        getService(urlMedicamentosPagina, response, function (data) {
            response.write(data);
            response.end();
        });
    } else if (total) {
        // from GET -> http://localhost:3000/medicamentos?total
        // to GET -> http://localhost:3000/medicamentos
        var urlMedicamentosPagina = urlSource + "/medicamentos";
        console.log("Request a: " + urlMedicamentosPagina);
        getService(urlMedicamentosPagina, response, function (data) {
            var tam = data.length;
            console.log("Tamanio de los datos = " + tam);
            var tamResult = {
                "total" : tam
            }
            response.write(JSON.stringify(tamResult));
            response.end();
        });
    }

}

// funcion que realiza llamada get
function getService(url, response, responseCallback) {
    http.get(url, function (innerResponse) {
        const { statusCode } = innerResponse;
        const contentType = innerResponse.headers["content-type"];

        innerResponse.setEncoding("utf8");
        let rawData = "";

        innerResponse.on("data", function (chunk) {
            rawData += chunk;
        });
        innerResponse.on("end", function () {
            try {
                const parsedData = JSON.parse(rawData);
                response.writeHead(statusCode, {
                    "Content-Type": contentType,
                    'Access-Control-Allow-Origin': 'http://localhost:8080',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                    'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
                });
                responseCallback(rawData);
            } catch (e) {
                console.error(e.message);
            }
        });
    });
}

// exports.iniciar = iniciar;
// exports.subir = subir;
exports.medicamentos = medicamentos;