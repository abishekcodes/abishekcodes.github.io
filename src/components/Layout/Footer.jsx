import React from 'react';

const Footer = () => {
    const footerLinks = [
      { href: 'https://linkedin.com/in/abishekmosesraj', label: '💼 LinkedIn' },
    ];
  
    return (
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-links">
            {footerLinks.map(({ href, label }) => (
              <a key={href} href={href} className="footer-link">
                {label}
              </a>
            ))}
          </div>
          <p className="footer-text">
            © {new Date().getFullYear()} Abishek Moses Raj. Crafted with passion for technology.
          </p>
        </div>
      </footer>
    );
  };

export default Footer;