/*
 Rutas de usuarios / Auth
 host + /api/auth
*/

const { Router } = require('express'); //importamos express y desestructuramos Router
const router = Router(); //configuramos el Router


//importamos el archivo controllers/auth.js donde tenemos la informacion que debe contener
//los endpoints definidos abajo, la funcion que debe de contener como segundo parametro
const { crearUsuario, loginUsuario, revaliarToken } = require('../controllers/auth')


//CREAMOS LOS ENDPOINTS
//usamos la funcion post del router con sus parametros req(request) y res(response)

router.post('/new', crearUsuario ); //como segundo parametro usamos la funcion del archivo controllers/auth importada en linea 12

//usamos la funcion post del router con sus parametros req(request) y res(response)
router.post('/', loginUsuario); //como segundo parametro usamos la funcion del archivo controllers/auth importada en linea 12

//usamos la funcion get del router con sus parametros req(request) y res(response)
router.get('/renew',revaliarToken); //como segundo parametro usamos la funcion del archivo controllers/auth importada en linea 12

//exportamos 
module.exports = router;