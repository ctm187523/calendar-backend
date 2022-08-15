const { response } = require('express'); //lo importamos para que podamos usar el intelligent a la hora de escribir codigo y reconozca los atributos y funciones de la libreria de Express
const Usuario = require('../models/Usuarios'); //importamos el schema de los usuarios
const bcrypt = require('bcryptjs'); //importamos la libreria para la encriptacion la hemos instaldo por consola --> npm i bcryptjs
const { generarJWT } = require('../helpers/jwt') //importamos el metodo generarJWT, obtenemos el token creado en el archivo helpers/jwt.js


//los controles son las funciones definidas en las peticiones(endpoints)
//del archivo routes/auth.js

const crearUsuario = async (req, res = response) => {

    //usamos req(request) para recibir una peticion, desestructuramos la respuesta que
    //obtenemos del request, req.body
    const { email, password } = req.body

    try {

        //verificamos que no haya en la base de datos nadie con el mismo mail si no hay nadie retorna null
        let usuario = await Usuario.findOne({ email });

        if (usuario) { //si no es null manda el error
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo'
            });
        }

        //creamos una instancia del Schema Usuarios importado arriba linea 2, usuamos el objeto usuario creado arriba
        //le pasamos el req.body que contiene la informacion recibida en este caso de postman json creado en Body-raw
        usuario = new Usuario(req.body);

        //encriptamos la contraseña instalada por consola -> npm i bcryptjs
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //grabamos en la base de datos
        await usuario.save();

        // Generamos nuestro JWT(Jason Web Token) en la linea 4 hemos importado la funcion generarJWT
        const token = await generarJWT(usuario.id, usuario.name);


        //si todo sale bien mandamos un 201(Created)
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const loginUsuario = async (req, res = response) => {

    //usamos req(request) para recibir una peticion, desestructuramos la respuesta que
    //obtenemos del request, req.body
    const { email, password } = req.body;

    try {

        //verificamos que no haya en la base de datos nadie con el mismo mail si no hay nadie retorna null
        const usuario = await Usuario.findOne({ email });

        if (!usuario) { //si el usuario no existe da error
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario no existe con ese correo'
            });
        }

        //vamos a confirmar las contraseñas en la base de datos la contraseña esta encriptada
        //en el metodo compareSync comparamos la contraseña en este caso de postman con la contraseña de la base de datos
        //nos devuelve false o true
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generamos nuestro JWT(Jason Web Token) en la linea 4 hemos importado la funcion generarJWT
        const token = await generarJWT(usuario.id, usuario.name);


        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

const revaliarToken = async(req, res = response) => {

    //obtenemos los valores del req del token validado en el archivo middlewares/validar-jwt.js
    const uid = req.uid;
    const name = req.name;

    //generamos un nuevo JWT y lo retornamos en esta peticion usando la funcion generarJWT de herpers/jwt.js
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token //retornamos el nuevo JWT
    });
}

//exportamos las funciones
module.exports = {
    crearUsuario,
    loginUsuario,
    revaliarToken
}