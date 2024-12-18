import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import './LoginPopup.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const LoginPopup = ({setShowLogin }) => {

  // this form is using two state One to show / hide login form -> Second to switch between login and sign in form
  const [currState,setCurrState]=useState("Login")

  const {setName,name,setToken,userEmail,setUserEmail,url}=useContext(StoreContext)

  // storing state of input fields
  const [data,setData]=useState(
    {
      name:"",
      email:"",
      password:""
    }
  )

  /// function to change the state of input fields
  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  /// Login | Register API Call
 
  const onLogin=async(event)=>{
    // prevent reloading
    event.preventDefault()
    let newUrl=url;

    //conditon to switch url
    if(currState==="Login"){
      newUrl+="/api/user/login"
    }
    else{
      newUrl+="/api/user/register"
    }

    //sending the data to to database
    try {
      const response=await axios.post(newUrl,data)
      console.log(response.data)
      if (response.data.success === true) {
        setToken(response.data.token);
        setName(response.data.narratoUser.name);
        setUserEmail(response.data.narratoUser.email);
        toast.success(response.data.message)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.narratoUser.name);
        localStorage.setItem("userEmail", response.data.narratoUser.email);

        setShowLogin(false); // Check if this is reached
        setTimeout(()=>{
          response.data.narratoUser.isVerified?"" :toast.error("User is not verified. Please Check your inbox to verify your email")
        },3000)

    }
      else{
        console.log(response)
        setShowLogin(true)
        alert(response.data.message)
       
      }
      
    } catch (error) {
      console.log(error)
    }finally{
      console.log(userEmail)
    }

    // geting the response and saving token in localStorage
    
  }

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">

          {/* heading which shows the current state */}
          <h2>{currState}</h2>
          <p onClick={()=>setShowLogin(false)} alt="X" style={{cursor:'pointer'}}>X</p>
         
        </div>
        
        <div className="login-popup-input">

          {/* Condition to show Name or not */}
          {currState==="Sign Up"? <input type="text" placeholder='Your Name' name='name' value={data.name} onChange={onChangeHandler}  required />:<></>}
          <input type="email" placeholder='Your Email' name='email' value={data.email} onChange={onChangeHandler} required />
          <input type="password" placeholder='Password' name="password" value={data.password} onChange={onChangeHandler} required />
        </div>

        <button>{currState==="Sign Up"?"Create account":"Login"}</button>

        {/* terms and conditon */}
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing to this I agree to the terms of use & privacy policy</p>
        </div>

        {/* Already account */}
        {
          currState==="Login"
          ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>
          :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>
        }
      </form>        
    </div>
  )
}

export default LoginPopup