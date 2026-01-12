import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFeather,
  faPenNib,
  faBookOpen,
  faHeart,
  faStar,
  faMoon
} from '@fortawesome/free-solid-svg-icons';

const PersonalHero = () => {
  const floatingIcons = [
    { icon: faFeather, color: "#E91E63" },
    { icon: faPenNib, color: "#9C27B0" },
    { icon: faBookOpen, color: "#3F51B5" },
    { icon: faHeart, color: "#F44336" },
    { icon: faStar, color: "#FFC107" },
    { icon: faMoon, color: "#607D8B" }
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
            }}
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
