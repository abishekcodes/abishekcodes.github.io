import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faAws, 
  faPython, 
  faDocker, 
  faGitAlt 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faCloud, 
  faDatabase, 
  faCode, 
  faRocket,
  faTerminal,
  faCogs,
  faChartLine,
  faUsers,
  faMicrochip
} from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  const roles = [
    "Tech Lead",
    "AWS Cloud Architect", 
    "Python Developer",
    "DevOps Engineer",
    "Mentor"
  ];

  const techIcons = [
    { icon: faAws, color: "#FF9900", name: "AWS" },
    { icon: faPython, color: "#3776ab", name: "Python" },
    { icon: faDocker, color: "#2496ED", name: "Docker" },
    { icon: faDatabase, color: "#336791", name: "Databases" },
    { icon: faCode, color: "#61DAFB", name: "APIs" },
    { icon: faTerminal, color: "#4CAF50", name: "DevOps" }
  ];

  const achievements = [
    { icon: faRocket, text: "99.995% API uptime achieved", color: "#FF6B6B" },
    { icon: faChartLine, text: "50% cost reduction in AWS Budget", color: "#4ECDC4" },
    { icon: faUsers, text: "Led engineering teams consisting of 5 engineers", color: "#45B7D1" },
    { icon: faCogs, text: "Created Applications that Processed 4 billion requests", color: "#96CEB4" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero-enhanced">
      <div className="floating-icons">
        {techIcons.map((tech, index) => (
          <div 
            key={tech.name}
            className="floating-icon"
            style={{
              animationDelay: `${index * 0.5}s`,
              '--icon-color': tech.color
            }}
          >
            <FontAwesomeIcon icon={tech.icon} />
          </div>
        ))}
      </div>

      <div className="hero-container">
        <div className="hero-main">
          <div className="hero-greeting">
            <span className="wave">👋</span> Hey there, I'm
          </div>
          
          <h1 className="hero-name-large">
            <span className="first-name">Abishek</span>
            <span className="last-name">Moses Raj</span>
          </h1>
          
          <div className="hero-role-container">
            <span className="role-prefix">I'm a </span>
            <span className={`hero-role ${isTyping ? 'typing' : 'deleting'}`}>
              {roles[currentRole]}
            </span>
            <span className="cursor">|</span>
          </div>

          <div className="hero-description-new">
            <p className="description-line">
              <FontAwesomeIcon icon={faCode} className="inline-icon" />
              Building <strong>scalable cloud architectures</strong> that power millions of API requests
            </p>
            <p className="description-line">
              <FontAwesomeIcon icon={faUsers} className="inline-icon" />
              Leading <strong>cross-functional teams</strong> to deliver game-changing solutions
            </p>
            <p className="description-line">
              <FontAwesomeIcon icon={faMicrochip} className="inline-icon" />
              Continuously adopting <strong>modern tools and frameworks</strong> to maximize development velocity
            </p>
          </div>

          <div className="cta-buttons-new">
            <button className="btn-primary-new">
              <FontAwesomeIcon icon={faRocket} />
              Explore My Work
            </button>
            <button className="btn-secondary-new">
              <span>Let's Build Something</span>
              <FontAwesomeIcon icon={faCode} />
            </button>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-number">7+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5+</div>
              <div className="stat-label">Projects Delivered</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">99.995%</div>
              <div className="stat-label">System Uptime</div>
            </div>
          </div>

          <div className="achievement-badges">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="achievement-badge"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  '--badge-color': achievement.color
                }}
              >
                <FontAwesomeIcon icon={achievement.icon} />
                <span>{achievement.text}</span>
              </div>
            ))}
          </div>

          <div className="tech-preview">
            <div className="tech-preview-title">Currently Working With</div>
            <div className="tech-icons-grid">
              {techIcons.slice(0, 4).map((tech, index) => (
                <div 
                  key={tech.name}
                  className="tech-icon-item"
                  style={{ '--tech-color': tech.color }}
                >
                  <FontAwesomeIcon icon={tech.icon} />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <div className="scroll-text">Scroll to explore</div>
      </div>
    </section>
  );
};

export default Hero;