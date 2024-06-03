const mongoose=require('mongoose');
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken');

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
userSchema.pre('save',async function(){
    console.log(this);
    const salt=await bcrypt.genSalt();
    console.log(salt);
    console.log(this.password);

    const hpass=await bcrypt.hash(this.password,salt);
    this.password=hpass;
    console.log(this.password);
})

userSchema.methods.generateToken=async function(){
    try{
        return jwt.sign({
            userId:this._id.toString(),
            username:this.username
        },process.env.JWT_SECRET,{
            expiresIn:"30d"
        });
    }
    catch(err){
        console.log(err);
    }
}

const User=new mongoose.model("User",userSchema);


module.exports = User;