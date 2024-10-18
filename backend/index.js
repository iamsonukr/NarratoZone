import express from 'express'
import connectDB from './config/db.connect.js'
import dotenv from 'dotenv';
import { blogRouter } from './routes/blogs.route.js';
import cors from 'cors'

dotenv.config();
const app=express()
connectDB()

app.use(express.json()) 
app.use(cors())


app.use('/api/blog',blogRouter)

app.get('/',(req,res)=>{
    res.send("It is done")
})

app.use('/images',express.static('uploads'))

app.listen(5001,()=>{
    console.log("serxver is listening ")
})