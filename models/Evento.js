const { Schema, model } = require('mongoose'); //importamos moongose para trabajar mongoDB con node


//creamos el esquema de los atributos que debe de tener un usuario y sus restricciones
const EventoSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
       type: Schema.Types.ObjectId, //hacemos una referencia al Schema de usuario de donde extraeremos los datos
       ref: 'Usuario',
       required: true
    }

});

module.exports = model('Evento', EventoSchema);