import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
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

NavHeader.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default NavHeader;
