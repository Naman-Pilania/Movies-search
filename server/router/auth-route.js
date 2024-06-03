const express=require('express');
const {register,login,user} = require('../controllers/auth-controllers')
const route=express.Router();
const authmiddleware = require('../middlewares/auth-middleware')

route.post('/register',register);
route.post('/login',login);
route.get('/',authmiddleware,user);
module.exports = route;