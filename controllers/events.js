const { response } = require('express');

const Evento = require('../models/Evento'); //importamos el Schema de los eventos


const getEventos = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'getEventos'
    })
}

const crearEvento = async (req, res = response) => {

    //creamos una instancia del modelo con el body del request
    const evento = new Evento(req.body);

    try {

        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const actualizarEvento = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarEvento'
    })
}

const eliminarEvento = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'eliminarEvento'
    })
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento

}