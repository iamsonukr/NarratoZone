import userModel from "../models/user.model.js"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import validator from "validator"
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();



// ------------------------------------------ Email Verification starts ---------------------------------

const transporter = nodemailer.createTransport({
   
    service: 'Gmail',
    auth: {
        user:process.env.EMAIL_USER, // Your email
        pass:process.env.EMAIL_PASSWORD // Your email password

    },
});

transporter.verify((error, success) => {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Server is ready to take messages');
    }
  });


// Email verification logic
const registerUser2 = async (req, res) => {
    const { name, password, email } = req.body;
    console.log(process.env.EMAIL_USER,process.env.EMAIL_PASSWORD)
    try {
        // Check if user already exists
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User already exists." });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email." });
        }

        // Check for strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);



        // Create a new user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            isVerified: false // Add a flag to indicate email verification status
        });

        // Save the new user
        const user = await newUser.save();


        // Generate email verification token
        const verificationToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send verification email
        const verificationUrl = `https://resoultpartnersbackend.onrender.com/api/user/verify?token=${verificationToken}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify your email',
            html: `
            <html>
              <head>
                <style>
                 <link rel="stylesheet" href="mail.css">
                </style>
              </head>
              <body>
                <div class="email-container">
                  <div class="header">
                    <img src="https://narratozone.vercel.app/assets/narratoLogo-BdIG8Zts.png" alt="Logo" width='300px' />
                  </div>
                  <div class="content">
                    <h2>Hi ${name},</h2>
                    <p>Welcome to Narratozone! Click the button below to verify your email address and complete your registration.</p>
                    <a href="${verificationUrl}" class="button">Verify Email</a>
                    <p>If you didn't sign up, you can safely ignore this email.</p>
                  </div>
                  <div class="footer">
                    &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
                  </div>
                </div>
              </body>
            </html>
            `
          };
          

        await transporter.sendMail(mailOptions);
        const narratoUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isVerified:user.isVerified,
        }

        const token=createToken(user._id)

        res.json({ success: true, message: "Registration successful! Please check your email to verify your account." ,narratoUser, token});
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

// Email verification endpoint
const verifyEmail = async (req, res) => {
    const { token } = req.query;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.userId);

        if (!user) {
            return res.json({ success: false, message: "Invalid token or user not found." });
        }

        if (user.isVerified) {
            return res.json({ success: false, message: "User already verified." });
        }

        user.isVerified = true;
        await user.save();

        res.json({ success: true, message: "Email verified successfully!" ,visit:"https://narratozone.vercel.app/"});
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Verification link expired or invalid." });
    }
};



// ------------------------------------------ Email Verification End ------------------------------------------------------------------------

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
        const user=await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"user does not exist..."})
        }
        //comparing password if user exist using bcrypt compare operator
        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials"})
        }
        const token=createToken(user._id);

        const narratoUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isVerified:user.isVerified,
        }

        res.json({success:true,message:"Login Successful",token,narratoUser})

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

export {loginUser,registerUser,getUsers,registerUser2,verifyEmail}