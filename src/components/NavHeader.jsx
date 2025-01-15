import { Link } from 'react-router-dom';
import './NavHeader.css';
import PropTypes from 'prop-types';

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


NavHeader.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default NavHeader;