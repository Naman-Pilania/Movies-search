require('dotenv').config();
const express = require('express');
const app=express();
const route=require('./router/auth-route');
const conectdb = require('./utils/db');
const cors = require('cors')
var corsOptions = {
    origin: 'http://localhost:5173',
    methods:"GET,POST,PUT,PATCH,DELETE,HEAD",
    credentials:true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
console.log('MONGODB_URL:', process.env.MONGODB_URL);
app.use(express.json());
app.use('/',route);


conectdb;







PORT=8000
console.log(PORT);
try{
    app.listen(PORT,()=>{
    console.log(`sever connected to ${PORT}`);
    })
}
catch(err){
    console.log(err);
}