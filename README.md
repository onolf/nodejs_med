# nodejs_med
Para correr la aplicacion:
* Instalado el nodejs, instalar el paquete "json-server" que servirá como un servidor
interno que alimentará a los servicios invocados al servidor nodejs. Ejecutar desde 
la terminal (cmd en windows) el siguiente comando para instalarlo en el sistema operativo: 
```
npm install -g json-server
```
* Correr el comando siguiente en el directorio raiz, (dentro de **/node_med**)
```
cd node_med
node server\index.js
```
* En el navegador ingresar la url http://localhost:8080
* Se muestra un listado en el que se puede recorrer por paginas.

Para importar el archivo json para consumir los servicios en el Postman, 
puede obtener de la ruta **documents\node_med.postman_collection.json** del
directorio raiz.

**Explicacion de la app:** Inicialmente se llama a la primera pagina 
conteniendo 10 elementos. Puede navegarse para ver otras paginas, segun
el usuario vaya requiriendo, (sea pagina 5, 9, 20, etc.)
* En la seccion del server, se realizo un servicio que autentica a un usuario
```
userName: admin
password: 12345
```
_Nota: Este servicio no esta incluido en el front-end._

El mismo consume del json-server que ya es ejecutado al iniciar el servidor.
* En el postman puede probarse la llamada a este servicio.
