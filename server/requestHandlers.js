var querystring = require("querystring");

var http = require("http");
var url = require("url");

var urlSource = "http://localhost:3000";

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
    }
}

function medicamentosTotal(response) {
    // from GET -> http://localhost:8888/medicamentos/total
    // to GET -> http://localhost:3000/medicamentos
    var urlMedicamentosPagina = urlSource + "/medicamentos";
    console.log("Request a: " + urlMedicamentosPagina);
    getService(urlMedicamentosPagina, response, function (data) {
        var tam = JSON.parse(data).length;
        console.log("Tamanio de los datos = " + tam);
        var tamResult = {
            "total": tam
        }
        response.write(JSON.stringify(tamResult));
        response.end();
    });
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

function signIn(response, query, postData) {
    // from POST -> http://localhost:8888/login?userName={userName}&password={password}
    // to GET -> http://localhost:3000/medicamentos
    let params = new Object();

    try {
        
        let postParams = {
            'userName': querystring.parse(postData)["userName"],
            'password': querystring.parse(postData)["password"]
        }
        let urlUsers = urlSource + '/users?userName=' + postParams.userName;
        getService(urlUsers, response, function (data) {
            data = JSON.parse(data)[0];
            try {
                if(data.userName === postParams.userName && data.password === postParams.password) {
                    // postService('/login', postParams, function(data) {
                        console.log("Login success!");
                        response.write(JSON.stringify({"result": "ok"}));
                        response.end();
                    // });
                } else {
                    response.write(JSON.stringify({"result": "error", "message": "Nombre de usuario y/o clave incorrecto/a."}));
                    response.end();
                }
            } catch(e) {
                console.error(e.message);
            }
        });
    } catch (e) {
        console.error(e.message);
    }
}
exports.medicamentos = medicamentos;
exports.medicamentosTotal = medicamentosTotal;
exports.signIn = signIn;