import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer-bg">
    <div className="footer-content">
      <span className="footer-copyright">
        &copy; {new Date().getFullYear()} Personal Todo. All rights reserved.
      </span>
      <span className="footer-madeby">Made by Shivam Srivastava</span>
      <div className="footer-socials">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-social-link">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social-link">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="footer-social-link">
          <i className="fab fa-x-twitter"></i>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
