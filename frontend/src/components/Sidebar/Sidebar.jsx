import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">

        <NavLink to={'/create'} className="sidebar-option">
          <p>Add User</p>
        </NavLink>

        <NavLink to={'/list'} className="sidebar-option">
          <p>List Users</p>
        </NavLink>
         
        <NavLink to={'/team-management'} className="sidebar-option">
          <p>Team Manage</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar