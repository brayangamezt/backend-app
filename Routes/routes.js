'use strict'

const express=require('express');
const ProjectController=require('../controllers/controller');

const router=express.Router();
/*El express.router es para poder crear acceso a rutas */

/*Un middleware es algo que se ejecuta antes de que se ejecute el metodo o accin de controlador*/
const multipart=require('connect-multiparty');
const multipartMiddleware=multipart({uploadDir:'./uploads'}); 
/*
1.-Primero se importar el connect multiparty en una variable
2.-Creamos una nueva variable y asignamos el valor de la variable anterior en la que importamos el connect-multiparty
3.-Lo siguiente es dar dos parametros a nuestra variable, los cuales son uploadDir y la direccion donde se van a guardar nuestros archivos
3.- Por ultimo se asigna a una ruta*/


router.get('/home', ProjectController.home);
router.post('/test',ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/projectUpdate/:id', ProjectController.updateProject);
router.delete('/delete-Project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id',multipartMiddleware ,ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);

/*
1.-Con el get se indica que se va obtener informacion de la ruta
2.-Despues Accedemos a nuestros controladores a travez de nuestra variable ProjectController en la cual importamos la ruta de nuestros controladores
3.-Con el .home decimos que vamos a acceder a controlador de HOME
*/

module.exports=router;