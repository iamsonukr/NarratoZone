import express from "express"
import multer from "multer"
import { createBlog, getSingleBlog, listBlog, removeBlog, updateBlog,increaseLike } from "../controllers/blogs.controller.js"
import { multerUpload } from "../utils/cloudinarry.js"

const blogRouter=express.Router()

// const storage =multer.diskStorage({
//     // Directory to store uploaded images
//     destination:"uploads", 
//     // Generating a unique filename by appending timestamp to the original filename
//     filename:(req,file,cb)=>{
//         return cb(null, `${Date.now()}${file.originalname}`)
//     }
// })
// // Configuring multer with the storage engine
// const multerUpload = multer({storage:storage})


blogRouter.get('/blogs',listBlog)


blogRouter.post('/create',multerUpload.single('image'),createBlog)

blogRouter.post('/update/:id',multerUpload.single('image'),updateBlog)
blogRouter.post('/getsingle/:id',getSingleBlog)

blogRouter.post('/like/:id',increaseLike)

blogRouter.post('/remove/:id',removeBlog)


export {blogRouter}