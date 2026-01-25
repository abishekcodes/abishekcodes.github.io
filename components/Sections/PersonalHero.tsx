'use client';

import React, { CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFeather,
  faPenNib,
  faBookOpen,
  faHeart,
  faStar,
  faMoon,
  faQuoteLeft,
  faMusic,
  faPalette,
  faLeaf,
  faSun,
  faCloud
} from '@fortawesome/free-solid-svg-icons';

const PersonalHero = () => {
  const floatingIcons = [
    // Row 1
    { icon: faFeather, color: "#E91E63" },
    { icon: faPenNib, color: "#9C27B0" },
    { icon: faBookOpen, color: "#3F51B5" },
    // Row 2
    { icon: faHeart, color: "#F44336" },
    { icon: faStar, color: "#FFC107" },
    { icon: faMoon, color: "#607D8B" },
    { icon: faQuoteLeft, color: "#00BCD4" },
    // Row 3
    { icon: faMusic, color: "#4CAF50" },
    { icon: faPalette, color: "#FF5722" },
    { icon: faLeaf, color: "#8BC34A" },
    { icon: faFeather, color: "#9C27B0" },
    // Row 4
    { icon: faSun, color: "#FF9800" },
    { icon: faCloud, color: "#03A9F4" },
    { icon: faHeart, color: "#E91E63" },
    { icon: faPenNib, color: "#673AB7" },
    { icon: faBookOpen, color: "#009688" },
    // Row 5
    { icon: faStar, color: "#FFEB3B" },
    { icon: faMoon, color: "#3F51B5" },
    { icon: faQuoteLeft, color: "#795548" },
    { icon: faMusic, color: "#FF4081" },
    // Additional scattered
    { icon: faPalette, color: "#7C4DFF" },
    { icon: faLeaf, color: "#4CAF50" },
    { icon: faFeather, color: "#F44336" },
    { icon: faSun, color: "#FFC107" },
    { icon: faCloud, color: "#00BCD4" },
    { icon: faHeart, color: "#E91E63" },
    { icon: faStar, color: "#9C27B0" },
    { icon: faPenNib, color: "#3F51B5" }
  ];

  return (
    <section id="home" className="hero-enhanced personal-hero">
      <div className="floating-icons">
        {floatingIcons.map((item, index) => (
          <div
            key={index}
            className="floating-icon"
            style={{
              animationDelay: `${index * 0.5}s`,
              '--icon-color': item.color
            } as CSSProperties}
          >
            <FontAwesomeIcon icon={item.icon} />
          </div>
        ))}
      </div>

      <div className="hero-container">
        <div className="hero-main personal-main">
          <div className="hero-greeting">
            <span className="wave">&#10024;</span> Welcome to
          </div>

          <h1 className="hero-name-large">
            <span className="first-name">My Personal</span>
            <span className="last-name">Space</span>
          </h1>

          <p className="personal-tagline">
            Where code meets creativity and thoughts become poetry
            <FontAwesomeIcon icon={faFeather} className="inline-icon" />
          </p>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <div className="scroll-text">Scroll to explore</div>
      </div>
    </section>
  );
};

export default PersonalHero;
