import express from 'express'
import connectDB from './config/db.connect.js'
import dotenv from 'dotenv';
import { blogRouter } from './routes/blogs.routes.js';
import {userRouter} from './routes/user.routes.js';
import cors from 'cors'
import { ideaRouter } from './routes/idea.routes.js';
dotenv.config();
const app=express()
connectDB()

app.use(express.json()) 
app.use(cors())


app.use('/api/blog',blogRouter)
app.use('/api/user',userRouter)
app.use('/api/idea',ideaRouter)

app.get('/',(req,res)=>{
    res.send('<h1>Resoult backend is running</h1>')
})

app.use('/images',express.static('uploads'))




app.listen(5000,()=>{
    console.log("serxver is listening ")
})