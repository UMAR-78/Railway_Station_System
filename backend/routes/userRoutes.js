const express = require('express')
const Router = express.Router()

const {RegisterUser , aunthenticateUser , getMe} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')


Router.post('/user' , RegisterUser)
Router.post('/user/auth' , aunthenticateUser)
Router.get('/user/me' , protect , getMe)


module.exports = Router