const express = require('express');
const { getInfoRowController, AddTokenController, getAllNotifications } = require('../controller/userController');
const { getSingleInfoController, getSingleUserController, checkUserAuh } = require('../controller/userController');
const { isSign } = require('../middleware/authcheck');
const Router = express.Router();

Router.get('/getuser', getSingleUserController)
Router.post('/auth' , checkUserAuh)
Router.post('/userInfoRow' , isSign , getInfoRowController)
Router.post('/changetoken' , isSign , AddTokenController)
Router.post('/notifications' , isSign , getAllNotifications)



module.exports = Router;