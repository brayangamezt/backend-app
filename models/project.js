'use strict'

//Modelos de base de datos

const mongoose=require('mongoose');
const Schema=mongoose.Schema; //ES PARA CREAR ESQUEMAS Y MANDARLOS A LA BASE DE DATOS, ES DECIR ESQUEMAS TIPO JSON, MODELOS

let ProjectSchema= Schema({
	name:String,
	description:String,
	category:String,
	year:Number,
	langs:String,
	image:String
});

module.exports=mongoose.model('users', ProjectSchema);
/*
1.-EL mongoose.model sirve para que mongoose tome este esquema y lo use como modelo
2.-Despues se le pasan 2 parametros
3.-El primer parametro es el nombre del proyecto que tenemos en la base de datos, dentro de la coleccion, en este caso users
4.-El segundo parametro es el nombre de la variable donde guardamos nuestros ESQUEMA/MODELO
*/