const { response } = require('express'); //lo importamos para que podamos usar el intelligent a la hora de escribir codigo y reconozca los atributos y funciones de la libreria de Express
const { report } = require('../routes/auth');


//los controles son las funciones definidas en las peticiones(endpoints)
//del archivo routes/auth.js

const crearUsuario = (req, res = response) => {

    //usamos req(request) para recibir una peticion, desestructuramos la respuesta que
    //obtenemos del request, req.body
    const { name, email, password } = req.body

    //hacemos validaciones si se cumple no continua el codigo y lanza un status 400
    if( name.length < 5 ){
        return res.status(400).json({
            ok: false,
            msg: 'El nombre debe de ser de 5 letras'
        })
    }

    //usamos res(response) para enviar una peticon
    res.json({
        ok: true,
        msg: 'registro',
        name,
        email,
        password
    })
}

const loginUsuario = (req, res = response) => {

    //usamos req(request) para recibir una peticion, desestructuramos la respuesta que
    //obtenemos del request, req.body
    const { email, password } = req.body

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    })
}

const revaliarToken = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'renew del Token'
    })
}

//exportamos las funciones
module.exports = {
    crearUsuario,
    loginUsuario,
    revaliarToken
}