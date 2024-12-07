import mongoose from "mongoose";

//first we create schema 
// second we create model

//minimize:false so that empty cart data gets created with np input value

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isVerified:{type:Boolean,default:false}
    
},{minimize:false})

const userModel=mongoose.models.users || mongoose.model('users',userSchema)
export default userModel