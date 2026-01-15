import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faMediumM } from '@fortawesome/free-brands-svg-icons';
import { usePageMode } from '../../context/PageModeContext';

const Footer = () => {
    const { mode } = usePageMode();
    const isProfessional = mode === 'professional';

    return (
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-cta">
            {isProfessional ? (
              <a
                href="https://linkedin.com/in/abishekmosesraj"
                target="_blank"
                rel="noopener noreferrer"
                className="social-connect"
              >
                <span className="social-icon-circle linkedin">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </span>
                <span className="social-text">Connect on LinkedIn</span>
              </a>
            ) : (
              <a
                href="https://medium.com/@RiversOfThought"
                target="_blank"
                rel="noopener noreferrer"
                className="social-connect"
              >
                <span className="social-icon-circle medium">
                  <FontAwesomeIcon icon={faMediumM} />
                </span>
                <span className="social-text">Connect on Medium</span>
              </a>
            )}
          </div>
          <p className="footer-text">
            © {new Date().getFullYear()} Abishek Moses Raj. {isProfessional ? 'Crafted with passion for technology.' : 'Words from the heart.'}
          </p>
        </div>
      </footer>
    );
  };

export default Footer;