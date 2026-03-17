import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-info">
            <a href="#" className="logo footer-logo">AMAYA<span>.</span></a>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Redefining luxury hospitality...</p>
            <div className="footer-social">
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          <div className="footer-links">
            <h3>LINKS</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#hotels">Hotels</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h3>HOTELS</h3>
            <ul>
              <li><a href="#">SR Hotel</a></li>
              <li><a href="#">Marvel Hotel</a></li>
              <li><a href="#">Esta Stays</a></li>
            </ul>
          </div>
        </div>
        <p className="copyright">© 2026 Amaya Hospitality. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
