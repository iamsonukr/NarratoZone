import express from 'express'
import connectDB from './config/db.connect.js'
import dotenv from 'dotenv';
import { blogRouter } from './routes/blogs.route.js';
import {userRouter} from './routes/user.route.js';
import cors from 'cors'

dotenv.config();
const app=express()
connectDB()

app.use(express.json()) 
app.use(cors())


app.use('/api/blog',blogRouter)
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send('<h1>Resoult backend is running</h1>')
})

app.use('/images',express.static('uploads'))

app.listen(5001,()=>{
    console.log("serxver is listening ")
})