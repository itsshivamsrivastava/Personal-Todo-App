import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => setMenuOpen((open) => !open);
    const handleMenuClose = () => setMenuOpen(false);

    // Fallback for username
    const displayName = user?.username || user?.email || 'User';
    console.log(displayName)

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/todos" className="navbar-logo" style={{ marginLeft: '10px', marginTop: '2px' }}>
                    MERN Todo App
                </Link>
                <div className="navbar-spacer" />
                <button className="navbar-hamburger" onClick={handleMenuToggle} aria-label="Toggle menu">
                    <span className="navbar-hamburger-bar"></span>
                    <span className="navbar-hamburger-bar"></span>
                    <span className="navbar-hamburger-bar"></span>
                </button>
                <div className={`navbar-menu${menuOpen ? ' open' : ''}`}>
                    {user ? (
                        <ul className="navbar-list">
                            <li onClick={handleMenuClose}>
                                <span className="navbar-welcome">Welcome, {displayName} ({user.role})</span>
                            </li>
                            <li onClick={handleMenuClose}>
                                <Link to="/todos" className="navbar-link">
                                    Todos
                                </Link>
                            </li>
                            {user.role === 'admin' && (
                                <li onClick={handleMenuClose}>
                                    <Link to="/admin" className="navbar-link">
                                        Admin Dashboard
                                    </Link>
                                </li>
                            )}
                            <li onClick={handleMenuClose}>
                                <Button
                                    onClick={logout}
                                    className="navbar-logout-btn"
                                >
                                    Logout
                                </Button>
                            </li>
                        </ul>
                    ) : (
                        <ul className="navbar-list">
                            <li onClick={handleMenuClose}>
                                <Link to="/login" className="navbar-link">
                                    Login
                                </Link>
                            </li>
                            <li onClick={handleMenuClose}>
                                <Link to="/register" className="navbar-link">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;