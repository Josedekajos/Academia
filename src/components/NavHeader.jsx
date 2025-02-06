import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NavHeader.css';
// eslint-disable-next-line no-unused-vars
import React from 'react';

const NavHeader = ({ userInfo }) => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate('/Chat');
  };

  const logOut = () => {
    localStorage.clear();
    navigate('/');
  }

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
            ChatHe
          </button>
        </li>
        <li><Link to="/groups">Groups</Link></li>
      </ul>
      <div className="user-profile">
        <span className="user-name">{ userInfo != null ? userInfo.first_name + " " + userInfo.last_name : "Kelsea"}</span>
        <span className="user-avatar">{userInfo != null ? userInfo.avatar : ""}</span>
        <button className='p-3 text-white bg-red-500 rounded-lg hover:text-opacity-65' onClick={() => logOut()}>Log out</button>
      </div>
    </nav>
  );
};

NavHeader.propTypes = {
  userInfo: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string,
    level: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
};

export default NavHeader;
