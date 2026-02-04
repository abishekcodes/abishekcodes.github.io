'use client';

import React, { useState, useEffect } from 'react';
import { usePageMode } from '@/context/PageModeContext';
import {
  Home,
  Code,
  Briefcase,
  Rocket,
  Newspaper,
  User,
  Mail,
  Feather,
  ChevronUp,
  X,
  LucideIcon
} from 'lucide-react';
import '@/styles/Layout/mobile-nav.css';

interface MobileNavProps {
  activeSection: string;
}

const sectionIcons: Record<string, LucideIcon> = {
  home: Home,
  skills: Code,
  experience: Briefcase,
  projects: Rocket,
  articles: Newspaper,
  about: User,
  contact: Mail,
  poetry: Feather,
};

const MobileNav: React.FC<MobileNavProps> = ({ activeSection }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { mode } = usePageMode();

  const professionalNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'articles', label: 'Articles' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const personalNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'poetry', label: 'Poetry' },
    { id: 'contact', label: 'Contact' },
  ];

  const navItems = mode === 'professional' ? professionalNavItems : personalNavItems;
  const currentIndex = navItems.findIndex(item => item.id === activeSection);
  const currentItem = navItems.find(item => item.id === activeSection) || navItems[0];

  useEffect(() => {
    const handleScroll = () => {
      // Show mobile nav after scrolling past hero section
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when section changes
  useEffect(() => {
    setIsExpanded(false);
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsExpanded(false);
  };

  if (!isVisible) return null;

  const CurrentIcon = sectionIcons[currentItem.id];

  return (
    <>
      {/* Backdrop */}
      {isExpanded && (
        <div
          className="mobile-nav-backdrop"
          onClick={() => setIsExpanded(false)}
        />
      )}

      <div className={`mobile-nav ${isExpanded ? 'expanded' : ''}`}>
        {/* Expanded Menu */}
        {isExpanded && (
          <div className="mobile-nav-menu">
            {navItems.map((item, index) => {
              const Icon = sectionIcons[item.id];
              return (
                <button
                  key={item.id}
                  className={`mobile-nav-item ${item.id === activeSection ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Floating Pill */}
        <button
          className="mobile-nav-pill"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <X size={18} className="pill-icon" />
          ) : (
            <>
              <CurrentIcon size={18} className="pill-icon" />
              <span className="pill-label">{currentItem.label}</span>
              <div className="pill-dots">
                {navItems.map((item, index) => (
                  <span
                    key={item.id}
                    className={`pill-dot ${index === currentIndex ? 'active' : ''} ${index < currentIndex ? 'passed' : ''}`}
                  />
                ))}
              </div>
              <ChevronUp size={14} className="pill-chevron" />
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default MobileNav;
