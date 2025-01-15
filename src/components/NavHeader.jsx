import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavHeader.css';

const NavHeader = ({ userInfo }) => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate('/Chat');
  };

  return (
    <nav className="nav-header">
      <div className="nav-brand">
        <Link to="/">Academia</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/about">About</Link></li>
        <li>
          <button className="chat-button" onClick={handleChatClick}>
            Chat
          </button>
        </li>
        <li><Link to="/groups">Groups</Link></li>
      </ul>
      <div className="user-profile">
        <span className="user-name">{userInfo.name}</span>
        <span className="user-avatar">{userInfo.avatar}</span>
      </div>
    </nav>
  );
};

export default NavHeader;

/*
*/