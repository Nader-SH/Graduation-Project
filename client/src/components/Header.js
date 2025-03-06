import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have auth context

function Header() {
  const { user } = useAuth(); // Get user from auth context
  
  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">Assistance Portal</Link>
      </div>
      <nav className="main-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/requests/new">Request Assistance</Link></li>
          {user && user.type === 'admin' && (
            <li><Link to="/admin/requests">Manage Requests</Link></li>
          )}
          {user ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header; 