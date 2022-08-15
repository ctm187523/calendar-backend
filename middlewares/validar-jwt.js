const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res= response, next) => { //next es la funcion que voy a ejecutar si el token es correcto

    // pedimos el token en el x-token del headers, lo hemos implementado asi en postman
    const token = req.header('x-token');
    
    //una vez tenemos el token lo validamos, la manera como leamos el token tiene que ser igual de como fue generado
    if ( !token ){ //si no recibimos el token
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {

        //pide el token obtenido y la variable de entorno con la contraseña creada y anteriormente incluida en la creacion del token helpers/jwt.js
        //obtenemos el payload del token
        const payload = jwt.verify(

            token,
            process.env.SECRET_JWT_SEED
        );

        //extraemos del payload del token el uid y el name y lo ponemos en la request
        //para que estos valores los recupere en el archivo controllers/auth.js/revaliarToken que sera la siguiente funcion al hacer next
        //ver linea 57 routes/auth.js

        req.uid = payload.uid;
        req.name = payload.name;
        
    } catch (error) {
        //si la validacion del Token falla
        return res.status(401).jason({
            ok:false,
            msg: 'Token no valido'
        })
    }

    next();
}

module.exports = {
    validarJWT
}