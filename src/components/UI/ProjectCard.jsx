import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const ProjectCard = ({ project, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [progressVisible, setProgressVisible] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), index * 300);
      const progressTimer = setTimeout(() => setProgressVisible(true), (index * 300) + 500);
      return () => {
        clearTimeout(timer);
        clearTimeout(progressTimer);
      };
    }, [index]);

    const renderContributionBar = (percentage) => {
      const totalDots = 10;
      const filledDots = Math.round((percentage / 100) * totalDots);
      
      return (
        <div className="contribution-container">
          <div className="contribution-bar">
            {[...Array(totalDots)].map((_, idx) => (
              <FontAwesomeIcon
                key={idx}
                icon={faCircle}
                className={`contribution-dot ${idx < filledDots ? 'filled' : 'empty'} ${
                  progressVisible ? 'animate-fill' : ''
                }`}
                style={{
                  animationDelay: progressVisible ? `${idx * 100}ms` : '0ms'
                }}
              />
            ))}
          </div>
          <span className="contribution-text">{project.myContribution || 0}%</span>
        </div>
      );
    };
  
    return (
      <div className={`project-card ${isVisible ? 'project-card-visible' : ''}`}>
        <div className="project-header">
          <span className="project-icon"> <FontAwesomeIcon icon={project.icon} /> </span>
        </div>
        <div className="project-content">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>

          {project.myContribution !== undefined && (
            <div className="project-contribution">
              <div className="contribution-label">
                <span>My Contribution</span>
              </div>
              {renderContributionBar(project.myContribution)}
            </div>
          )}
          
          <div className="tech-stack">
            {project.techStack.map((tech, idx) => (
              <span key={idx} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default ProjectCard;