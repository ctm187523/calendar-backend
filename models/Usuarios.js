const { Schema, model } = require('mongoose'); //importamos moongose para trabajar mongoDB con node


//creamos el esquema de los atributos que debe de tener un usuario y sus restricciones
const UsuarioSchema = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }

});

module.exports = model('Usuario', UsuarioSchema);