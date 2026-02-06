import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import '../../style/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Brand Section */}
                <div className="footer-brand">
                    <h2>
                        RENT<span className="accent">&</span>LEASE
                    </h2>
                    <p className="brand-desc">
                        Experience the freedom of access without ownership.
                        The premium marketplace for household essentials, electronics, and more.
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={20} /></a>
                        <a href="#" className="social-icon" aria-label="Facebook"><Facebook size={20} /></a>
                        <a href="#" className="social-icon" aria-label="Twitter"><Twitter size={20} /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-links">
                    <h3>DISCOVER</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Browse Catalog</Link></li>
                        <li><Link to="/wishlist">Wishlist</Link></li>
                        <li><Link to="/myprofile">Profile</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div className="footer-links">
                    <h3>SUPPORT</h3>
                    <ul>
                        <li><Link to="#">Help Center</Link></li>
                        <li><Link to="#">Terms of Service</Link></li>
                        <li><Link to="#">Privacy Policy</Link></li>
                        <li><Link to="#">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Contact / Newsletter */}
                <div className="footer-links">
                    <h3>STAY CONNECTED</h3>
                    <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="newsletter-input"
                        />
                        <button type="submit" className="newsletter-btn">Subscribe</button>
                    </form>
                    <div style={{ marginTop: '20px', color: '#9ca3af', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <Mail size={16} /> support@rentlease.com
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Phone size={16} /> +1 (555) 123-4567
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Rent & Lease. All rights reserved.</p>
                <div className="footer-legal">
                    <Link to="#">Privacy</Link>
                    <Link to="#">Terms</Link>
                    <Link to="#">Cookies</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
