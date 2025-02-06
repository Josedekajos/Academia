import {Link, useNavigate} from 'react-router-dom';
import './NavHeader.css';
import React, {useEffect, useState} from 'react';

const NavHeader = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Initialize user as null

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse the stored user string to an object
    }
  }, []);

  const handleChatClick = () => {
    navigate('/chat');
  };

  const logOut = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
      <nav className="nav-header">
        <div className="nav-brand">
          <Link to="/">Academia</Link>
        </div>
        <ul className="nav-links">
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
        <span className="user-name">
          {user ? `${user.first_name} ${user.last_name}` : "Kelsea"}
        </span>
          <span className="user-avatar">{user ? user.avatar : ""}</span>
          <button className='p-3 text-white bg-red-500 rounded-lg hover:text-opacity-65' onClick={logOut}>Log out</button>
        </div>
      </nav>
  );
};

export default NavHeader;