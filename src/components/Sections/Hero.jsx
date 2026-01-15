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
  faMicrochip,
  faBolt,
  faDiagramProject,
  faRobot,
  faDharmachakra
} from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  const roles = [
    { title: "Tech Lead", category: "leadership" },
    { title: "AWS Cloud Architect", category: "cloud" },
    { title: "Python Developer", category: "development" },
    { title: "DevOps Engineer", category: "development" },
    { title: "Mentor", category: "leadership" }
  ];

  const techIcons = [
    { icon: faBolt, color: "#009688", name: "FastAPI" },
    { icon: faDiagramProject, color: "#FF6F00", name: "LangGraph" },
    { icon: faRobot, color: "#7C4DFF", name: "CrewAI" },
    { icon: faDharmachakra, color: "#326CE5", name: "Kubernetes" }
  ];

  // Floating background icons covering all skillsets
  const floatingIcons = [
    // Row 1 - Agentic AI
    { icon: faRobot, color: "#7C4DFF", name: "AI" },
    { icon: faDiagramProject, color: "#FF6F00", name: "LangGraph" },
    { icon: faRobot, color: "#9C27B0", name: "AI2" },
    // Row 2 - AWS & Cloud
    { icon: faAws, color: "#FF9900", name: "AWS" },
    { icon: faCloud, color: "#4FC3F7", name: "Cloud" },
    { icon: faAws, color: "#FF9900", name: "AWS2" },
    { icon: faCloud, color: "#00BCD4", name: "Cloud2" },
    // Row 3 - Python & Development
    { icon: faPython, color: "#3776AB", name: "Python" },
    { icon: faCode, color: "#00BCD4", name: "Code" },
    { icon: faTerminal, color: "#4CAF50", name: "Terminal" },
    { icon: faPython, color: "#3776AB", name: "Python2" },
    // Row 4 - DevOps
    { icon: faDocker, color: "#2496ED", name: "Docker" },
    { icon: faDharmachakra, color: "#326CE5", name: "Kubernetes" },
    { icon: faGitAlt, color: "#F05032", name: "Git" },
    { icon: faDocker, color: "#2496ED", name: "Docker2" },
    // Row 5 - Database & Data
    { icon: faDatabase, color: "#00ACC1", name: "Database" },
    { icon: faChartLine, color: "#9C27B0", name: "Analytics" },
    { icon: faDatabase, color: "#4CAF50", name: "Database2" },
    // Row 6 - Leadership & API
    { icon: faUsers, color: "#E91E63", name: "Leadership" },
    { icon: faBolt, color: "#009688", name: "FastAPI" },
    { icon: faCogs, color: "#607D8B", name: "DevOps" },
    { icon: faRocket, color: "#FF5722", name: "Deploy" },
    // Additional scattered icons
    { icon: faCode, color: "#4CAF50", name: "Code2" },
    { icon: faTerminal, color: "#FF9800", name: "Terminal2" },
    { icon: faCogs, color: "#795548", name: "DevOps2" },
    { icon: faRocket, color: "#E91E63", name: "Deploy2" }
  ];

  const achievements = [
    { icon: faRocket, text: "Zero-downtime canary deployments", color: "#FF6B6B" },
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
        {floatingIcons.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="floating-icon"
            style={{
              animationDelay: `${index * 0.3}s`,
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
            <span className={`hero-role ${isTyping ? 'typing' : 'deleting'} role-${roles[currentRole].category}`}>
              {roles[currentRole].title}
            </span>
            <span className={`cursor cursor-${roles[currentRole].category}`}>|</span>
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
            <button
              className="btn-primary-new"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <FontAwesomeIcon icon={faRocket} />
              Explore My Work
            </button>
            <a
              href="https://linkedin.com/in/abishekmosesraj"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-new"
            >
              <span>Let's Build Something</span>
              <FontAwesomeIcon icon={faCode} />
            </a>
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
              {techIcons.map((tech, index) => (
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