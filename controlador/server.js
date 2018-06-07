var http = require("http");
var url = require("url");
var express = require('express');
var app = express(); 

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

app.get('*', function (req, res) {
    res.sendfile('../vista/index.html');
    console.log("Hola Mundo ")
});

exports.iniciar = iniciar;