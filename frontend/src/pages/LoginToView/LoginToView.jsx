import React from 'react';
import { Link } from 'react-router-dom';
import './LoginToView.css'

const LoginToView = ({setShowLogin}) => {
  return (
    <div className="login-prompt">
      <div className="login-prompt-container">
        <div className="lock-icon">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        
        <h1>Content Locked</h1>
        <p className="main-message">Please log in to view this content</p>
        <p className="sub-message">
          Join our community to access exclusive content and features
        </p>
        
        <div className="login-actions">
          <button className="login-button" onClick={()=>setShowLogin(true)}>
            Sign In
          </button>
          <span className="or-divider">or</span>
          <button onClick={()=>setShowLogin(true)} className="register-link">
            Create an Account
          </button>
        </div>

        <div className="benefits">
          <h2>Member Benefits</h2>
          <ul>
            <li>
              <span className="benefit-icon">✓</span>
              Access to exclusive content
            </li>
            <li>
              <span className="benefit-icon">✓</span>
              Engage with our community
            </li>
            <li>
              <span className="benefit-icon">✓</span>
              Save and bookmark articles
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginToView;