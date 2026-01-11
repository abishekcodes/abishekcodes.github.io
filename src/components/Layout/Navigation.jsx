import React, { useState, useEffect } from 'react';
import { usePageMode } from '../../context/PageModeContext';
import logo from '../../assets/favicon.svg';

const Navigation = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { mode, toggleMode } = usePageMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const professionalNavItems = [
    { href: '#home', label: 'Home' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' }
  ];

  const personalNavItems = [
    { href: '#home', label: 'Home' },
    { href: '#poetry', label: 'Poetry' },
    { href: '#contact', label: 'Contact' }
  ];

  const navItems = mode === 'professional' ? professionalNavItems : personalNavItems;

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo" onClick={() => scrollToSection('#home')}>
          <img src={logo} alt="Abishek Mosesraj Logo" className="logo-svg" />
        </div>

        <ul className="nav-links">
          {navItems.map(({ href, label }) => (
            <li key={href}>
              <button
                onClick={() => scrollToSection(href)}
                className={`nav-link ${activeSection === href.slice(1) ? 'active' : ''}`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="mode-toggle">
          <span className={`mode-label ${mode === 'professional' ? 'active' : ''}`}>Pro</span>
          <button
            className="toggle-switch"
            onClick={toggleMode}
            aria-label={`Switch to ${mode === 'professional' ? 'personal' : 'professional'} mode`}
          >
            <span className={`toggle-slider ${mode === 'personal' ? 'personal' : ''}`} />
          </button>
          <span className={`mode-label ${mode === 'personal' ? 'active' : ''}`}>Poetry</span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
