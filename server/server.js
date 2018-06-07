var http = require("http");
var url = require("url");
var express = require("express");
var app = express();
var path = require("path");

function iniciar(route, handle) {
    function onRequest(request, response) {
        var dataPosteada = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Peticion para  " + pathname + " recibida.");

        var query = url.parse(request.url).query;
        console.log("Query es " + query);

        request.setEncoding("utf8");

        request.addListener("data", function (trozoPosteado) {
            dataPosteada += trozoPosteado;
            console.log("Recibido trozo POST '" + trozoPosteado + "'.");
        });

        request.addListener("end", function () {
            route(handle, pathname, response, query);
        });
    }

    http.createServer(onRequest).listen(8888);
    console.log("Servidor Iniciado.");
}

function iniciarCliente() {
    // viewed at http://localhost:8080
    app.get('/', function (req, res) {
        var indexView = 
        res.sendFile(path.join(__dirname, '../client/', 'index.html'));
    });

    app.use(express.static(path.join(__dirname, '../client/')));

    app.listen(8080);   
}

exports.iniciar = iniciar;
exports.iniciarCliente = iniciarCliente;