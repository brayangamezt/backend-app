'use strict'

const express=require('express'); //Con esto cargamos el modulo de express en esta variable, es decir, podemos hacer peticiones HTTP
const bodyParser=require('body-parser'); //Con esto cagamos el modulo Body-Parser, es decir, para convertir peticiones al backend a formato JSON

let app=express(); //En esta variable estoy ejecutando express



//CARGAR ARCHIVOS DE RUTAS
const project_routes=require('./Routes/routes');




//CONFIGURACION DE MIDDLEWARES
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); //Cualquier peticion que se haga o reciva se convertira a JSON


//CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});




//RUTAS
app.use('/api',project_routes);




/*app.post('/test/:id', (req, res)=>{console.log(req.body.nombre); console.log(req.query.web); console.log(req.params.id);
    res.status(200).send({message:"hola mundo desde mi appy de node"}); });

app.get('/', (req, res)=>{res.status(200).send("<h3>Hola esta es mi primera ruta</h3>"); });*/

/*
1.-Utilizamos app que es donde tenemos guardado EXPRESS
2.-Utilizamos get que tiene dos parametros, una direccion y una funcion del CALLBACK
3.-Dentro del get creamos una ruta http y los parametros del callback que seran una requisicion y una respuesta
4.-Dentro de la funcion damos la respuesta con status 200 que es el status que se da cuando la respuesta es exitosa
*/


//EXPORTAR MODULO

module.exports=app; //Se utiliza module por que es un modulo y el app, por que es el que tiene la configuracion de los middleware en donde se guardo express