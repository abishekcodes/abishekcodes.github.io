import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeather } from '@fortawesome/free-solid-svg-icons';

const PersonalHero = () => {
  return (
    <section id="home" className="hero-enhanced personal-hero">
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
            <FontAwesomeIcon icon={faFeather} className="inline-icon" />
            Where code meets creativity and thoughts become poetry.
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
