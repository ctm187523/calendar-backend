//HEMOS INSTALADO EXPRES COMO SERVIDOR VER VIDEO 366 y 367

//importamos las variables de entorno para ello hemos instalado en la consola
// --> npm i dotenv
require('dotenv').config();

//console.log( process.env); //vemos todas las variables de entorno y las propias creadas en el archivo .env


//importamos express previamente instalado por consola ver video 366 y 367
//primero ponemos --> npm init -y     para crear el aarchivo package.json
//seguidamente --> npm i nodemon -g   para que se actualize automaticamente al hacer cambios en el codigo
//hemos modificado los scripts del package.json -> "dev": "nodemon index.js","start": "node index.js" para iniciar por consola
//para instalar EXPRESS en consola ponemos -> npm i express

const express = require('express');

//Crear el servidor de express
const app = express();

//Llamamos a la base de datos configurada en database/config.js
//la importamos y usamos su metodo dbConnection()
const { dbConnection} = require('./database/config');
dbConnection();

//hemos instalado CORS en la terminal --> npm install cors
//para hacer que solo puedan hacer peticiones de la API desde ciertos dominios especificados como seguridad
//importamos CORS
const cors = require('cors');
app.use(cors())

//Muestra el Directorio publico, contenido en la carpeta public
//usamos el metodo use() de express que es considerado como un middleware
//que no es mas que una funcion que se ejecuta en el momento que se hace una petucion
//al servidor, una funcion que se ejecuta siempre que pase por algun lugar
app.use( express.static('public')); //indicamos la carpeta public qeu contien el html y el css localhost:4000

// Lectura y parseo del body, pasamos las peticiones por otro middleware, decimos que las peticiones que vengan en formato Json
app.use ( express.json() );

// RUTAS

// Authentication, crear, login, renovacion del token
//usamos de nuevo un middleware ponemos la ruta donde queremos habilitar este endpoint, aqui esta todo lo relacionado a la autenticacion
//en el segundo parametro ponemos la ruta donde tenemos el codigo todo lo que este archivo auth va a exportar
//lo va a habilitar en /api/auth, en el navegador pondremos localhost:4000/api/auth y se redirigira al contenido del archivo ./routes/auth
app.use('/api/auth', require('./routes/auth') );

//CRUD(Create, Read, Update, Delete) de los eventos del calendario
app.use('/api/events', require('./routes/events') );



//Escuchar peticiones, ponemos el puerto que queramos que corra y un callback
//que informa donde esta corriendo la aplicacion, usamos la variable de entorno
//creada en .env para establecer el puerto ya que podria variar el puerto en produccion
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});