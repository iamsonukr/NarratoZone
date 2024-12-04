import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets'
import './Navbar.css'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import toast from 'react-hot-toast';


const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { token, setToken,name } = useContext(StoreContext)

  // go to certain page after doing certain thing
  const navigate = useNavigate()



  const logout = () => {
    localStorage.removeItem("token");
    setToken()
    navigate('/')
    toast.success("Logged out Successfully.")
  }

  return (
    <div className='navbar'>
      <Link to={'/'}> <img src={assets.logo} alt="" className="logo" /></Link>

      {/* navbar menu */}
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu('home')} className={menu === 'home' ? "active" : ""} >Home</Link>
        <Link to='/create' onClick={() => setMenu('create')} className={menu === 'create' ? "active" : ""}>Create</Link>
        <Link to='/idea' onClick={() => setMenu('idea')} className={menu === 'idea' ? "active" : ""}>Generate Idea</Link>
        <a href='#footer' onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? "active" : ""}>Contact Us</a>
      </ul>

      {/* right navbar */}
      <div className="navbar-right">
        {/* <img src={assets.search_icon} alt="" /> */}
        <div className="navbar-search-icon">

        </div>
        {/* setting up the showLogin value  */}
        {
          !token ? <button onClick={() => setShowLogin(true)} >sign in</button>
            : <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" /> <span> Hi {name}!</span>
              <div onClick={logout} ><img src={assets.logout_icon} alt="" /><p>Logout</p></div>
            </div>
        }
      </div>
    </div>
  )
}

export default Navbar