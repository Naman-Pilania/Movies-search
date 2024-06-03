const express=require('express');
const route=express.Router()
const mongoose=require('mongoose');
const User=require('../models/user-schema')
const bcrypt = require('bcryptjs');
const register=async (req,res)=>{
    const {username,email,password}=req.body;
    const userExist = await User.findOne({ email: email});
    if(userExist){
        return res.status(400).json({msg:"user exists"})
    }
    else{
        // const hashpassword = await bcrypt.hash(password,10);
        console.log(email+"+"+password);
        const userCreated =await User.create({username,email,password});
        return res.status(201).send({email,token:await userCreated.generateToken(),userId: userCreated._id.toString(),});
    }
}

const login = async (req,res)=>{
    try{
        const {email,password}=req.body;
        console.log(email,password);
        const userExist = await User.findOne({ email: email });
        if(!userExist){
            return res.status(400).json({message:"Invalid Credentials"})
        }
        else{
            const user = await bcrypt.compare(password,userExist.password);
            console.log(password+"+"+userExist.password);
            if(user){
                res.status(200).json({
                    msg:"Login Successfull",token:await userExist.generateToken(),userId: userExist._id.toString()
                })
            }
            else{
                res.status(201).json({message:"Invalid Credentials password"})
            }
        }
    }
    catch{
        res.status(500).json("Internal Server Error");
    }

}

const user=async (req,res)=>{
    try{
        const userData=req.user;
        res.status(200).json({userData})
        console.log(userData);

    }
    catch(err){
        console.log(`error is there ${err}`);
    }

}

module.exports = {register,login,user};

