const { response } = require('express');
const { validationResult } = require('express-validator');


//creamos un custom middlewares para las validaciones

//el next es un callback que se ejecutara si todo ha sido correcto
//se ejecuta cada ve que una validacion es correcta y pasa a la siguiente
const validarCampos = (req, res = response, next) => {

    //manejo de errores, en auth.routes hemos instalado express-validator y arriba de este archivo tambien
    //usamos de lo importado arriba validationResult
    const errors = validationResult(req); //como atributo mandamos req(request)

    //evaluamos si hay errores y creamos json en caso de que haya errores, cambiamos el status a 400 que seria bad request
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next(); //si no hay ningun error llamamos al next para validar el siguiente, en caso de error no se llama

}

module.exports = {
    validarCampos
}