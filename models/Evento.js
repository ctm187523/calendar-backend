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

//con este codigo tenemos acceso a los propeidades(campos) guardadas en el base de datos de Mongo,importamos EventoSchema
EventoSchema.method('toJSON', function() {
    //extraemos la version(__v y el _id lo demas lo dejamos alamcenado en  ..object)
    //modificamos el _id por id y la __v al no mencionarla abajo en la transformacion desaparece del JSON
    const { __v, _id, ...object } = this.toObject();

    //remplazamos el _id por id, estas modificaciones no se ejecutan direcatamente en la base de datos solo en el Json
    object.id = _id;
    return object;
})

module.exports = model('Evento', EventoSchema);