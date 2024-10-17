import express from "express"
import { createBlog, getSingleBlog, listBlog, removeBlog, updateBlog } from "../controllers/blogs.controller.js"

const blogRouter=express.Router()

blogRouter.get('/blogs',listBlog)

blogRouter.post('/create',createBlog)

blogRouter.post('/update',updateBlog)
blogRouter.get('/getsingle/:id',getSingleBlog)

blogRouter.post('/remove',removeBlog)


export {blogRouter}