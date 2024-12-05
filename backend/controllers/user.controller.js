import userModel from "../models/user.model.js"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import validator from "validator"


/// Function to create token
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


/// login user
const loginUser= async(req,res)=>{
    //fetching the user input
    const {email,password}=req.body
    try{
        //checking if email exist
        const narratoUser=await userModel.findOne({email})
        if(!narratoUser){
            return res.json({success:false,message:"user does not exist..."})
        }
        //comparing password if user exist using bcrypt compare operator
        const isMatch=await bcrypt.compare(password,narratoUser.password)

        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials"})
        }
        const token=createToken(narratoUser._id);
        res.json({success:true,token,narratoUser})

    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

///register
const registerUser=async(req,res)=>{
    const {name,password,email}=req.body
    try{
        // checking if user is already registered
        const exist =await userModel.findOne({email})
        if(exist){
            return res.json({success:false,message:"User already exist."})
        }

        //validating if the email is a valid email
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email."})
        }

        //checking strong password
        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //hasing user password
        //genSalt can be between 5-15
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        //creating new user
        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        })
        // saving new user
        const user=await newUser.save();
        //creating token
        const token=createToken(user._id)
        //sending response and token
        const narratoUser = {
            _id: user._id,
            name: user.name,
            email: user.email
        };
        
        res.json({success:true,token,narratoUser})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// function to get users
const getUsers=async(req,res)=>{
    try{
        const users=await userModel.find({})
        res.json({success:true,data:users})
    }catch(error){
        res.json({success:false, data:error})
    }
}

export {loginUser,registerUser,getUsers}