/*
 Rutas de usuarios / Auth
 host + /api/auth
*/

//hemos instaldos express-validator para hacer las validaciones
//--> npm i express-validator
const { check } = require('express-validator'); //el check es el middleware que se encarga de las validaciones

const { Router } = require('express'); //importamos express y desestructuramos Router
const router = Router(); //configuramos el Router

//importamos el archivo creado por nosotros validar-campos
const { validarCampos } = require('../middlewares/validar-campos'); 


//importamos el archivo controllers/auth.js donde tenemos la informacion que debe contener
//los endpoints definidos abajo, la funcion que debe de contener como segundo parametro
const { crearUsuario, loginUsuario, revaliarToken } = require('../controllers/auth');

//importamos la funcion validarJWT del archivo middlewares/validar-jwt.js
const {  validarJWT } = require('../middlewares/validar-jwt');


//CREAMOS LOS ENDPOINTS
//usamos la funcion post del router con sus parametros req(request) y res(response)

router.post(
    '/new',
    //middlewares para validaciones de express-validator, usamos el check ver arriba
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(), //evalua si el email es correcto
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos //llamamos a la funcion creada por nosotros en el archivo validar-campos.js y importada arriba
    ],
    crearUsuario //como tercer parametro usamos la funcion del archivo controllers/auth importada en linea 19
); 

//usamos la funcion post del router con sus parametros req(request) y res(response)
router.post(
    '/',
    //middlewares para validaciones de express-validator, usamos el check ver arriba
    [
        check('email', 'El email es obligatorio').isEmail(), //evalua si el email es correcto
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos //llamamos a la funcion creada por nosotros en el archivo validar-campos.js y importada arriba
    ],
    loginUsuario //como tercer parametro usamos la funcion del archivo controllers/auth importada en linea 19
);

//usamos la funcion get del router con sus parametros req(request) y res(response)
//como primer parametro ponemos la ruta
//como segundo parametro ponemos la funcion validarJwt importada arriba del fichero middlewares/validar-jwt.js
//donde recibimos el token 
//como tercer parametro usamos la funcion del archivo controllers/auth importada en linea 19
router.get('/renew', validarJWT, revaliarToken); 

//exportamos el router
module.exports = router;