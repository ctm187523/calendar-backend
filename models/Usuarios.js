const { Schema, model } = require('mongoose'); //importamos moongose para trabajar mongoDB con node


//creamos el esquema de los atributos que debe de tener un usuario y sus restricciones
const UsuarioSchema = Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true
    }

});

module.exports = model('Usuario', UsuarioSchema);