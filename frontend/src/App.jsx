import { useState } from 'react'

import CreateBlog from './pages/CreateBlog/CreateBlog'
import BlogList from './pages/BlogList/BlogList'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Header from './components/Header/Header'
import './App.css'
import { Toaster } from 'react-hot-toast'
// import TeamManagement from './pages/TeamManagement/TeamManagement'


function App() {

  const url='https://resoultpartnersbackend.onrender.com'

  return (
    <>
    <div className="app-component">
      <Navbar/>
      <Header/>

      <Routes>
    
        <Route path='/' element={<BlogList url={url}/>}/>
        <Route path="/create/:id?" element={<CreateBlog url={url}/>}/>
        <Route path='/list' element={<BlogList url={url}/>}/>
       
      </Routes>
    </div>
    </>
  )
}

export default App
