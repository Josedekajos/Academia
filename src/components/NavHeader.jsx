import React from 'react';
import { Link } from 'react-router-dom';
import './NavHeader.css';

const NavHeader = ({ userInfo }) => {
  return (
    <nav className="nav-header">
      <div className="nav-brand">
        <Link to="/">StudyConnect</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <div className="user-profile">
        <span className="user-name">{userInfo.name}</span>
        <span className="user-avatar">{userInfo.avatar}</span>
      </div>
    </nav>
  );
};

export default NavHeader;