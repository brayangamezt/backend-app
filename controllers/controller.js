'use strict' //Esto es un controlador, cada funcion dentro del controler se le denomina control


const modelo=require('../models/project');
const fs=require('fs');
const path=require('path');

let controller={
	home:function(req,res){
		return res.status(200).send({message:"soy la home"});
	},




	

	test:function(req,res){
		return res.status(200).send({message:"Soy las test"});
	},







	saveProject:function(req,res){
		var project= new modelo();

		var params=req.body;

		project.name=params.name;
		project.description=params.description;
		project.category=params.category;
		project.year=params.year;
		project.langs=params.langs;
		project.image=params.image;

		project.save((err,modelo)=>{
			if(err) return res.status(500).send({message:"Error al guardar"});

			if(!modelo) return res.status(404).send({message:"No se encontro el proyecto"});

			return res.status(200).send({modelo});
		});

	},





	


	getProject: function(req, res){
		var projectId=req.params.id;

		if(projectId==null) return res.status(404).send({message:"El proyecto esta vacio"});

		modelo.findById(projectId, (err, modelo)=>{

			if(err) return res.status(500).send({message:"error al devolver los datos"});

			if(!modelo) return res.status(404).send({message:"el proyecto no existe"});

			return res.status(200).send({modelo});
		});

	},






	getProjects:function(req, res){
		modelo.find({/*Aqui se puede introducir un parametro*/}).sort('year').exec((err, modelo)=>{
			if(err) return res.status(500).send({message:"No se a encontrado proyectos"});

			if(!modelo) return res.status(404).send({message:"El proyecto no existe"});

			return res.status(200).send({modelo});
		});
	},









	updateProject:function(req,res){
		let projectId=req.params.id;
		let update=req.body;

		modelo.findByIdAndUpdate(projectId, update, {new:true}, (err, modelo)=>{
			if(err) return res.status(500).send({message:"Error al actualizar"});

			if(!modelo) return res.status(404).send({message:"no existe el proyecto para actualizar"});

			return res.status(200).send({modelo});
		});
	},








	deleteProject:function(req,res){
		let projectId=req.params.id;

		modelo.findByIdAndRemove(projectId, (err,modelo)=>{
			if(err) return res.status(500).send({message:"no se a podidio borrar el documento"});

			if(!modelo) return res.status(404).send({message:"No se puede eliminar ese proyecto"});

			return res.status(200).send({modelo});
		});
	},






    //ESTUDIAR ESTE METODO
	uploadImage:function(req,res){
		let projectId=req.params.id;
		let fileName='imagen no subida';

		if(req.files){//El REQ.FILES ES PARA MANDAR IMAGENES O ARCHIVOS AL SERVIDOR
			let filePath=req.files.image.path;
			let fileSplit=filePath.split('\\');
			let fileName=fileSplit[1];


			let extSplit=fileName.split('\.');
			let fileExt=extSplit[1];

			//Si el archivo es de alguna de estas extensiones entonces..
			if(fileExt== 'png' || fileExt=='jpg' || fileExt=='jpeg' || fileExt=='gif'){

				modelo.findByIdAndUpdate(projectId, {image: fileName}, {new:true}, (err, modeloUpdate)=>{

					if(err) return res.status(500).send({message:"la imagen no se ha subido"});
					if(!modeloUpdate) return res.status(404).send({message:"el proyecto no existe"});
					return res.status(200).send({project:modeloUpdate});
				});
			}else{
				fs.unlink(filePath, (err)=>{return res.status(200).send({message:"la extension no es valida"}); });
			}

		}else{
			return res.status(200).send({message:fileName});
		}
	},






	


	//ESTUDIAS ESTE METODO
	getImageFile:function(req, res){
		var file=req.params.image;
		var path_file='./uploads/'+file;

		fs.exists(path_file, (exists)=>{
			if(exists){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(200).send({message:'no existe la imagen'});
			}
		});
	}



};

module.exports=controller;
//Esto es para importar el modulo de controller en otros documentos
/*Es importante crear una ruta de backend por cada controlador que existe*/