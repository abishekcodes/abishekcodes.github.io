'use client';

import React, { useState, useEffect } from 'react';
import { usePageMode } from '@/context/PageModeContext';
import { Briefcase, Feather, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mode, toggleMode } = usePageMode();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [activeSection]);

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
    { href: '#about', label: 'About Me' },
    { href: '#contact', label: 'Contact' }
  ];

  const personalNavItems = [
    { href: '#home', label: 'Home' },
    { href: '#poetry', label: 'Poetry' },
    { href: '#contact', label: 'Contact' }
  ];

  const navItems = mode === 'professional' ? professionalNavItems : personalNavItems;

  const scrollToSection = (href: string): void => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo" onClick={() => scrollToSection('#home')}>
          <img src="/favicon.svg" alt="Abishek Mosesraj Logo" className="logo-svg" width={40} height={40} />
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

        <div className="nav-actions">
          <div className="mode-toggle">
            <button
              className={`mode-icon-btn ${mode === 'professional' ? 'active' : ''}`}
              onClick={() => mode !== 'professional' && toggleMode()}
              title="Professional"
              aria-label="Switch to professional mode"
            >
              <Briefcase size={18} />
              <span className="mode-tooltip">Professional</span>
            </button>
            <button
              className="toggle-switch"
              onClick={toggleMode}
              aria-label={`Switch to ${mode === 'professional' ? 'personal' : 'professional'} mode`}
            >
              <span className={`toggle-slider ${mode === 'personal' ? 'personal' : ''}`} />
            </button>
            <button
              className={`mode-icon-btn ${mode === 'personal' ? 'active' : ''}`}
              onClick={() => mode !== 'personal' && toggleMode()}
              title="Poetry"
              aria-label="Switch to poetry mode"
            >
              <Feather size={18} />
              <span className="mode-tooltip">Poetry</span>
            </button>
          </div>
          <button
            className="nav-hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu-dropdown">
          {navItems.map(({ href, label }) => (
            <button
              key={href}
              className={`mobile-menu-item ${activeSection === href.slice(1) ? 'active' : ''}`}
              onClick={() => { scrollToSection(href); setIsMenuOpen(false); }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
