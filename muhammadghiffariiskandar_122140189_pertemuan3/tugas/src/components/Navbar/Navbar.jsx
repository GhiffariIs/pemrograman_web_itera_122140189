// components/Navbar/Navbar.jsx
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h1>Book Manager</h1>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/stats" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Stats
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;