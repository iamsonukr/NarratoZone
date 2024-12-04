import express from 'express'
import { ideaGeneratorOne } from '../controllers/ideas.controller.js'

const ideaRouter=express.Router()

ideaRouter.post('/chatgpt',ideaGeneratorOne)


export {ideaRouter}