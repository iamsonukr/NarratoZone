import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import toast from 'react-hot-toast';
import './Navbar.css'

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, setToken, name } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name")
    localStorage.removeItem("userEmail")

    setToken();
    navigate('/');
    toast.success("Logged out Successfully.");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const closeMenu = (e) => {
      if (!e.target.closest('.navbar') && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [isMenuOpen]);

  return (
    <div className='navbar'>
      <div className="nav-items">

      <Link to='/'> 
        <img src={assets.logo} alt="" className="logo" />
      </Link>

      {/* Hamburger Menu Button */}
      <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navbar Menu */}
      <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        <Link 
          to='/' 
          onClick={() => { setMenu('home'); setIsMenuOpen(false); }} 
          className={menu === 'home' ? "active" : ""}
          >
          Home
        </Link>
        <Link 
          to='/create' 
          onClick={() => { setMenu('create'); setIsMenuOpen(false); }} 
          className={menu === 'create' ? "active" : ""}
        >
          Create
        </Link>
        <Link 
          to='/idea' 
          onClick={() => { setMenu('idea'); setIsMenuOpen(false); }} 
          className={menu === 'idea' ? "active" : ""}
          >
          Generate Idea
        </Link>
        <Link 
          to='/contact' 
          onClick={() => { setMenu('contact-us'); setIsMenuOpen(false); }} 
          className={menu === 'contact-us' ? "active" : ""}
          >
          Contact Us
        </Link>
      </ul>

      {/* Right Navbar */}
      <div className="navbar-right">
        <div className="navbar-search-icon"></div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" /> 
            <span className='user-greet'>Hi {name}!</span>
            <div onClick={logout}>
              <img width={30} src={assets.logout_icon} alt="" />
              <p>Logout</p>
            </div>
          </div>
        )}
      </div>
        </div>
    </div>
  );
};

export default Navbar;