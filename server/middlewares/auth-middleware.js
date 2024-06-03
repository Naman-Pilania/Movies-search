const jwt = require('jsonwebtoken');
const User = require('../models/user-schema')
const authmiddleware = async (req,res,next) =>{
    const token = req.header('Authorization');
    
    if(!token){
        return res.status(401).json({msg:'token not provided'})
    }
    const jwttoken = token.replace('Bearer',"").trim();
    console.log(jwttoken);
    try{
        const isverified = jwt.verify(jwttoken,process.env.JWT_SECRET)
        console.log(process.env.JWT_SECRET);
        console.log(isverified);
        const userData = await User.findOne({username:isverified.username}).select({
            password:0,
        });

        console.log(userData);

        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        next();
    }
    catch(err){
        return res.status(401).json({msg:"Unauthorised token"})
    }

}

module.exports = authmiddleware;