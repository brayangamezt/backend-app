'use strict'

const mongoose=require('mongoose'); //Se importa mongoose, el cual sirve para trabajar directamente con la base de datos
const servidor=require('./servidor');
const port=3700;



mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/prueba')
        .then(()=>{
                console.log("conexion a la base de datos establecida exitosamente");
         /*CREACON DEL SERVIDOR*/
                servidor.listen(port, ()=>{console.log("Servidor creado correctamente en la localHost: 3700");} );
        })
        .catch(err=>{console.log(err)});


