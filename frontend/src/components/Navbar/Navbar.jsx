import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="navbar">
      <div className="navItems">
        {/* <h1>MyBlog</h1> */}
        <div className="navbar-options">

          <NavLink to={'/create'} className="navbar-option">
            <p>Add Blogs</p>
          </NavLink>

          <NavLink to={'/list'} className="navbar-option">
            <p>All Blogs</p>
          </NavLink>

          {/* <NavLink to={'/team-management'} className="navbar-option">
            <p>Team Manage</p>
          </NavLink> */}


        </div>

      </div>
    </div>
  )
}

export default Sidebar