
//instalamos la libreria para poder trabajar con jwt(Jason Web Tokens)
// --> npm i jsonwebtoken

const jwt = require('jsonwebtoken'); //importamos jwt

//creamos el token retorna una Promesa
const generarJWT = ( uid, name  ) => { //los parametros son para crear el payload ver https://jwt.io/

    return new Promise ( (resolve, reject ) => {

        //creamos el payload
        const payload = { uid, name };

        //generamos el Token como primer parametro es el payload y como segundo parametro
        //uso una variable de entorno del archivo .env donde he creado una contraseña que le
        //servira al backend para saber si el token es el que generamos o no
        //el tercer parametro es la duracion que le damos al token, en nuestro caso le damos 2 horas
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn : '2h'
        },(err, token) => {  //creamos un callback que se va a disparar con un error, en caso de que no se pueda firmar y tendria el token en caso de que no haya error

            if ( err ){ //en caso de que haya un error
                console.log(err);
                reject('No se pudo generar el token');
            }

            //en caso de que no haya error obtenemos el token
            resolve(token); 
        });

    })

}

module.exports= {
    generarJWT
}

