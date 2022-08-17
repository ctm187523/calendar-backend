const { response } = require('express');

const Evento = require('../models/Evento'); //importamos el Schema de los eventos


const getEventos = async (req, res = response) => {

    //recuperamos los eventos, en los atributos del find podriamos poner condiciones
    //si se deja sin parametros los retorna todos
    const eventos = await Evento.find()
        .populate('user', 'name'); //con esta instruccion recibimos de los eventos tambien toda la informacion referida al user, si no lo ponemos solo sale el id
    //si lo dejamos como populate('user') recibimos toda la informacion del user con populate('user','name') recibimos solo en name del user y el id que siepre viene
    //si quisieramos el name y el password pondriamos .populate('user','name password')
    res.json({
        ok: true,
        eventos
    })
}

const crearEvento = async (req, res = response) => {

    //creamos una instancia del modelo con el body del request
    const evento = new Evento(req.body);


    try {

        //obtenemos el id del usuario, ver models/Evento linea 23 hay vemos la relacion Schema.Types.ObjectId
        evento.user = req.uid;

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

const actualizarEvento = async (req, res = response) => {

    //hemos puesto despues del ultimo slash / el id de uno de los eventos que queremos actualizar 62fcf3bc648e646e33291990
    const eventoId = req.params.id; //recibimos el id del evento que pusimos en el ultimo slash / 62fcf3bc648e646e33291990

    //recibimos el uid del usuario
    const uid = req.uid;


    try {

        //verificamos si existe el id usando mongoose
        const evento = await Evento.findById(eventoId);



        //verificmaos
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese Id'
            })
        }

        //verificamos si la persona que creo el evento es la misma que lo quiere modificar, solo puede modificar un evento la misma persona que lo ha creado
        //usamos la constante creada arriba uid para verificar que es la misma
        if (evento.user.toString() !== uid) { //si es diferente la persona que lo ha creado no lo permitimos, usamos le metodo toString()
            return res.status(401).json({
                ok: false,
                msg: ' no tiene privilegio de editar este evento'
            })

        }

        const nuevoEvento = {
            ...req.body, //desestructuramos toda la informacion(title,start,end,notes)
            user: uid            //ponemos el id del usuario ya que en la desestructuracion no viene
        }


        //usamos el metodo findByIdAndUpdate para que busque por el id y lo actualize
        //como primer parametro es eventoId que contiene el id del Evento
        //como segundo parametro el nuevoEvento que quiero remplazar
        //como tercer parametro ponemos new : true para que retorne la actualizacion si no se pone manda el antiguo sin actualizar
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.json({
            ok: true,
            evento: eventoActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarEvento = async (req, res = response) => {

    //hemos puesto despues del ultimo slash / el id de uno de los eventos que queremos eliminar 62fcf3bc648e646e33291990
    const eventoId = req.params.id; //recibimos el id del evento que pusimos en el ultimo slash / 62fcf3bc648e646e33291990

    //recibimos el uid del usuario
    const uid = req.uid;

    try {

        //verificamos si existe el id usando mongoose
        const evento = await Evento.findById(eventoId);


        //verificmaos
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese Id'
            })
        }

        //verificamos si la persona que creo el evento es la misma que lo quiere borrar, solo puede borrar un evento la misma persona que lo ha creado
        //usamos la constante creada arriba uid para verificar que es la misma
        if (evento.user.toString() !== uid) { //si es diferente la persona que lo ha creado no lo permitimos, usamos le metodo toString()
            return res.status(401).json({
                ok: false,
                msg: ' no tiene privilegio para eliminar este evento'
            })

        }

        await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok: true,
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento

}