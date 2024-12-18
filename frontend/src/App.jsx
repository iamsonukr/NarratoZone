import { useContext, useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';

import CreateBlog from './pages/CreateBlog/CreateBlog'
import BlogList from './pages/BlogList/BlogList'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Footer from './components/Footer/Footer'
import { StoreContext } from './context/StoreContext';
import LoginToView from './pages/LoginToView/LoginToView';
import MyForm from './pages/MyForm/MyForm';
import BlogIdeaGenerator from './pages/BlogIdeaGenerator/BlogIdeaGenerator';
import ContactPage from './pages/ContactUs/ContactPage';
// import TeamManagement from './pages/TeamManagement/TeamManagement'


function App() {
  const[showLogin,setShowLogin]=useState(false)

  // const url='https://resoultpartnersbackend.onrender.com'
  const url='http://localhost:5001'
  const {token}=useContext(StoreContext)



  return (
    <>
    <div className="app-component">
      {showLogin?<LoginPopup setShowLogin={setShowLogin} url={url} />:<></>}
      <Toaster />
      <Navbar setShowLogin={setShowLogin}/>
      
      <Routes>
        <Route path='/' element={<BlogList url={url} setShowLogin={setShowLogin} />}/>
        
        {token?<Route path="/create/:id?" element={<CreateBlog url={url} setShowLogin={setShowLogin}/>}/>
        :<Route path="/create/:id?" element={<LoginToView setShowLogin={setShowLogin}/>}/>}
        <Route path='/list' element={<BlogList url={url}/>}/>
        <Route path='/sample' element={<MyForm />} />
        <Route path='/idea' element={<BlogIdeaGenerator />} />
        <Route path='/contact' element={<ContactPage />} />
        
      </Routes>
      <Footer/>
    </div>
    </>
  )
}

export default App
