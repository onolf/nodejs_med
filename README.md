# nodejs_med
Para correr la aplicacion:
* Instalado el nodejs; correr el comando siguiente en el directorio raiz 
```
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
Este consume del json-server que ya es ejecutado al iniciar el servidor.
* En el postman esta escrita la llamada a este servicio.
