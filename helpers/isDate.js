//funcion para validar fechas

//instalamos por consola moment --> npm i moment para validar fechas
//lo importamos
const moment = require('moment');

const isDate = ( value, rest ) => {

   if( !value ){
       return false;
   }

   const fecha = moment ( value );
   if ( fecha.isValid()) { //usamos el metodo de moment para ver si es una fecha valida
       return true;
   }else {
       return false;
   }
}

module.exports = { isDate }