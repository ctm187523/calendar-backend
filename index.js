//importamos las variables de entorno para ello hemos isntalado en la consola
// --> npm i dotenv
require('dotenv').config();

//console.log( process.env); //vemos todas las variables de entorno y las propias creadas en el archivo .env


//importamos express
const express = require('express');

//Crear el servidor de express
const app = express();

//Muestra el Directorio publico, contenido en la carpeta public
//usamos el metodo use() de express que es considerado como un middleware
//que no es mas que una funcion que se ejecuta en el momento que se hace una petucion
//al servidor, una funcion que se ejecuta siempre que pase por algun lugar
app.use( express.static('public')); //indicamos la carpeta public qeu contien el html y el css

// Rutas
// app.get('/', (req, res )=> {

//     res.json({
//         ok:true
//     })
// });



//Escuchar peticiones, ponemos el puerto que queramos que corra y un callback
//que informa donde esta corriendo la aplicacion, usamos la variable de entorno
//creada en .env para establecer el puerto ya que podria variar el puerto en produccion
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});