const {RegisterUser} = require('../controllers/userController')
const Router = require('express').Router()

Router.post('/user' , RegisterUser)


module.exports = Router