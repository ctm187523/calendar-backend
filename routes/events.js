/*
    Events Routes
    /api/events
*/

//importamos Router del paquete instalado express
const { Router } = require('express');
const router = Router();


//importamos check de express para las validaciones
const { check } = require('express-validator')

//importamos de middlewares el archivo creado por nosotros validar-campos.js
const { validarCampos } = require('../middlewares/validar-campos')

//importamos los metodos del controlador del archivo comntrollers/events
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events')

//importamos el metodo para validar los tokens
const { validarJWT } = require('../middlewares/validar-jwt');

//importamos de helpers/isDate la funcion para validar fechas creada por nosotros
const {  isDate  } = require('../helpers/isDate');

//RUTAS

//podriamos quitar el segundo parametro validarJWT usando un middleware
//y con el codigo de abajo que dejo comentado todas las peticiones que esten debajo de el codigo ya incluyen el validarJWT
//router.use( validarJWT );

//Obtener eventos
router.get(
    '/',
    validarJWT,
    getEventos);

//Crear un nuevo evento
router.post(
    '/',
    //validaciones
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatorio').custom( isDate ), //en custom mandamos un callback que es una funcion creada por nosotros en helpers/isDate para validar fechas ya que expres-validator no dispone de esto
        check('end','Fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos 
    ],
    validarJWT,
    crearEvento);


//Actualizar evento, debemos mandar despues del / un id
router.put(
    '/:id',
    validarJWT,
    actualizarEvento);

//Borrar evento, debemos mandar despues del / un id
router.delete(
    '/:id',
    validarJWT,
    eliminarEvento);


//exportamos el router
module.exports = router;
