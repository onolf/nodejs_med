var http = require("http");
var url = require("url");
var express = require("express");
var app = express();
var path = require("path");
var exec = require("child_process").exec;

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
            route(handle, pathname, response, query, dataPosteada);
        });
    }

    http.createServer(onRequest).listen(8888);
    console.log("Servidor Iniciado.");
}

function iniciarCliente() {
    // viewed at http://localhost:8080
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../client/', 'index.html'));
    });

    app.use(express.static(path.join(__dirname, '../client/')));

    app.listen(8080);   
}

function iniciarJsonServer(params) {
    exec("json-server ./data/disponibilidad_medicamentos.json");
}

exports.iniciar = iniciar;
exports.iniciarCliente = iniciarCliente;
exports.iniciarJsonServer = iniciarJsonServer;