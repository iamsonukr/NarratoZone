import express, { Route, Router } from 'express'
import { loginUser,registerUser,getUsers } from '../controllers/user.controller.js'

const userRouter=new Router()

userRouter.post('/register',registerUser)

userRouter.post('/login',loginUser)
userRouter.get('/users',getUsers)

export  {userRouter};

