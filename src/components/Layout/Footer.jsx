import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-cta">
            <a
              href="https://linkedin.com/in/abishekmosesraj"
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-button"
            >
              <span className="linkedin-icon">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </span>
              <span className="linkedin-text">Follow on LinkedIn</span>
              <span className="linkedin-arrow">
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </a>
          </div>
          <p className="footer-text">
            © {new Date().getFullYear()} Abishek Moses Raj. Crafted with passion for technology.
          </p>
        </div>
      </footer>
    );
  };

export default Footer;