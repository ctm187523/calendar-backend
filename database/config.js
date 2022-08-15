
//he instalado moongose --> npm i mongoose
//para conectar la base de datos mongoDB compass con node

const mongoose = require('mongoose');

const dbConnection = async() =>{

    try {
        //usamos las variables de entorno creadas en .env
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true
        });

        console.log('DB OnLIne');

    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la Base de datos');
    }
}

module.exports = {
    dbConnection
}

