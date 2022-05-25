const express = require('express');

const { addToInfo, adminLogin, getDirController, getSingleUserAdmin, startUpdateUser, getInfoRowController } = require('../controller/adminController');
const { isAuth } = require('../middleware/authcheck');


const Router = express.Router();


Router.get('/add' , addToInfo)
Router.post('/auth' , adminLogin)
Router.get('/dir' , isAuth, getDirController)
Router.post('/users' ,isAuth , getSingleUserAdmin)
Router.post('/uusers' ,isAuth , startUpdateUser)
Router.post('/inforow' ,isAuth ,  getInfoRowController)

module.exports = Router;