var querystring = require("querystring");

var http = require("http");
var url = require("url");

var urlSource = "http://localhost:3000";

function iniciar(response, postData) {
    console.log("Manipulador de peticion 'iniciar' ha sido llamado.");

    var body = '<html>' +
        '<head>' +
        '<meta http‐equiv="Content‐Type" content="text/html; charset = UTF‐8" />' +
        '</head>' +
        '<body>' +
        '<form action="/subir" method="post">' +
        '<textarea name="text" rows="20" cols="60"></textarea>' +
        '<input type="submit" value="Enviar texto" />' +
        '</form>' +
        '</body>' +
        '</html>';
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(body);
    response.end();
}
function subir(response, dataPosteada) {
    console.log("Manipulador de peticion 'subir' ha sido llamado.");
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("Tu enviaste texto: " + querystring.parse(dataPosteada)["text"]);
    response.end();
}

function medicamentos(response, query) {
    // query : pagina={numero-pagina}
    var queryStrings = query.split("&");
    var pairQueryStrings = queryStrings.map(function (element) {
        return element.split("=");
    });
    console.log(pairQueryStrings);

    // retorna el valor de la pagina solicitada
    var pagina = pairQueryStrings.find(function (pair) {
        if (pair[0] === "pagina") {
            return pair;
        }
    })[1];

    // GET -> http://localhost:3000/medicamentos?_page={pagina}
    if (pagina) {
        var urlMedicamentosPagina = urlSource + "/medicamentos?_page=" + pagina;
        console.log("Request a: " + urlMedicamentosPagina);
        getService(urlMedicamentosPagina, response);
    }

}

// funcion que realiza llamada get
function getService(url, response) {
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
                console.log(contentType);
                response.writeHead(statusCode, {
                    "Content-Type": contentType,
                    'Access-Control-Allow-Origin': 'http://localhost:8080',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                    'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
                });
                response.write(rawData);
                response.end();
            } catch (e) {
                console.error(e.message);
            }
        });
    });
}

exports.iniciar = iniciar;
// exports.subir = subir;
exports.medicamentos = medicamentos;