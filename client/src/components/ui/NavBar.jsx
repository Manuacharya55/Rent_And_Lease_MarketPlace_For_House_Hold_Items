import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import { Menu, X, Home, ShoppingBag, Heart, User, LogOut } from 'lucide-react';
import '../../style/NavBar.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          RENT<span className="logo-accent">&</span>LEASE
        </Link>

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        {/* Nav Menu */}
        <ul className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className={`nav-links ${isActive('/')}`} onClick={closeMenu}>
              <Home size={20} className="nav-icon" /> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className={`nav-links ${isActive('/products')}`} onClick={closeMenu}>
              <ShoppingBag size={20} className="nav-icon" /> Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/wishlist" className={`nav-links ${isActive('/wishlist')}`} onClick={closeMenu}>
              <Heart size={20} className="nav-icon" /> Wishlist
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/myprofile" className={`nav-links ${isActive('/myprofile')}`} onClick={closeMenu}>
              <User size={20} className="nav-icon" /> Profile
            </Link>
          </li>

          {/* Logout */}
          <li className="nav-item" onClick={handleLogout}>
            <span className="nav-links logout-btn">
              <LogOut size={20} className="nav-icon" /> Logout
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
