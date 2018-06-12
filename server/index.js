var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.iniciar;
handle["/medicamentos"] = requestHandlers.medicamentos;
handle["/medicamentos/total"] = requestHandlers.medicamentosTotal;
handle["/login"] = requestHandlers.signIn;

server.iniciarJsonServer();
server.iniciar(router.route, handle);
server.iniciarCliente();