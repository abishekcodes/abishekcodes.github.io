'use client';

import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faExternalLinkAlt,
  faBookOpen,
  faCheckCircle,
  faBriefcase,
  faBuilding,
  faExclamationTriangle,
  faLightbulb,
  faQuestionCircle,
  faWrench,
  faChartBar
} from '@fortawesome/free-solid-svg-icons';

const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="project-modal-backdrop" onClick={handleBackdropClick}>
      <div className="project-modal">
        {/* Sticky Header */}
        <div className="modal-header">
          <div className="modal-icon">
            <FontAwesomeIcon icon={project.icon} />
          </div>
          <div className="modal-title-section">
            <h2 className="modal-title">{project.title}</h2>
            <div className="modal-meta">
              <span className={`status-badge ${project.status}`}>
                {project.status === 'production' ? 'In Production' : 'Proof of Concept'}
              </span>
              <span className="company-badge">
                <FontAwesomeIcon icon={faBuilding} />
                {project.company}
              </span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="modal-body">
          {/* Role Section */}
          <div className="modal-role-section">
            <div className="role-header">
              <FontAwesomeIcon icon={faBriefcase} />
              <span>My Role: <strong>{project.role}</strong></span>
            </div>
          </div>

          {/* Problem Section */}
          {project.problem && (
            <div className="modal-section problem-section">
              <h3>
                <FontAwesomeIcon icon={faQuestionCircle} />
                The Challenge
              </h3>
              <p>{project.problem}</p>
            </div>
          )}

          {/* Solution Section */}
          {project.solution && (
            <div className="modal-section solution-section">
              <h3>
                <FontAwesomeIcon icon={faWrench} />
                The Solution
              </h3>
              <p>{project.solution}</p>
            </div>
          )}

          {/* Impact Section */}
          {project.impact && (
            <div className="modal-section impact-section">
              <h3>
                <FontAwesomeIcon icon={faChartBar} />
                Impact & Results
              </h3>
              <ul className="impact-list">
                {project.impact.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div className="modal-section tech-section">
            <h3>
              <FontAwesomeIcon icon={faWrench} />
              Tech Stack
            </h3>
            <div className="tech-tags">
              {project.techStack.map((tech, idx) => (
                <span key={idx} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          {/* Key Highlights */}
          {project.highlights && (
            <div className="modal-section highlights-section">
              <h3>
                <FontAwesomeIcon icon={faCheckCircle} />
                Key Highlights
              </h3>
              <ul className="highlights-list">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Learnings */}
          {project.learnings && (
            <div className="modal-section learnings-section">
              <h3>
                <FontAwesomeIcon icon={faLightbulb} />
                What I Learned
              </h3>
              <p>{project.learnings}</p>
            </div>
          )}

          {/* Note for POC projects */}
          {project.note && (
            <div className="modal-note">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <p>{project.note}</p>
            </div>
          )}

          {/* Links */}
          {(project.liveUrl || project.blogUrl) && (
            <div className="modal-links">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-link live"
                >
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                  View Live
                </a>
              )}
              {project.blogUrl && (
                <a
                  href={project.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-link blog"
                >
                  <FontAwesomeIcon icon={faBookOpen} />
                  Read Blog Post
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
