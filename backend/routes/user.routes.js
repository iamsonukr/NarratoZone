import express, { Route, Router } from 'express'
import { loginUser,registerUser,getUsers,registerUser2,verifyEmail } from '../controllers/user.controller.js'

const userRouter=new Router()

userRouter.post('/register',registerUser2)

userRouter.post('/login',loginUser)
userRouter.get('/users',getUsers)
userRouter.get('/verify',verifyEmail)

export  {userRouter};

