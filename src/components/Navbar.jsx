import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    document.body.style.overflow = newState ? 'hidden' : '';
  };

  const closeMenuDrawer = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <div 
        className={`menu-overlay ${isMenuOpen ? 'active' : ''}`} 
        id="menuOverlay"
        onClick={closeMenuDrawer}
      ></div>

      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="mainHeader">
        <div className="container nav-container">
          <a href="#home" className="logo">AMAYA<span>.</span></a>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="nav-links">
            <li className="close-menu-container">
              <span className="close-menu" onClick={closeMenuDrawer}>&times;</span>
            </li>
            <li><a href="#home" onClick={closeMenuDrawer}>Home</a></li>
            <li><a href="#about" onClick={closeMenuDrawer}>About</a></li>
            <li><a href="#hotels" onClick={closeMenuDrawer}>Hotels</a></li>
            <li><a href="#amenities" onClick={closeMenuDrawer}>Amenities</a></li>
            <li><a href="#gallery" onClick={closeMenuDrawer}>Gallery</a></li>
            <li><a href="#feedback" onClick={closeMenuDrawer}>Feedback</a></li>
            <li><a href="#contact" onClick={closeMenuDrawer}>Contact</a></li>
            <li><a href="#" className="btn-luxury" style={{ padding: '10px 24px', fontSize: '0.7rem' }}>Book Now</a></li>
          </ul>

          <div className="nav-extra">
            <div className="theme-toggle" id="themeToggle" onClick={toggleTheme}>
              <i className={`fas ${theme === 'light' ? 'fa-sun' : 'fa-moon'}`}></i>
            </div>
            <div className="menu-toggle" id="menuToggle" onClick={toggleMenu}>
              <i className="fas fa-bars-staggered"></i>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
