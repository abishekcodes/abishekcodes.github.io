'use client';

import React, { useEffect, useRef, MouseEvent, TouchEvent } from 'react';
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
  faChartBar,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import type { Project } from '@/types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev: (() => void) | null;
  onNext: (() => void) | null;
  currentIndex: number;
  totalCount: number;
}

const ProjectModal = ({ project, isOpen, onClose, onPrev, onNext, currentIndex, totalCount }: ProjectModalProps) => {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (modalBodyRef.current) {
          modalBodyRef.current.scrollBy({ top: 100, behavior: 'smooth' });
        }
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (modalBodyRef.current) {
          modalBodyRef.current.scrollBy({ top: -100, behavior: 'smooth' });
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  // Scroll to top when project changes
  useEffect(() => {
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0;
    }
  }, [project]);

  if (!isOpen || !project) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    // Only trigger if horizontal swipe is greater than vertical and > 50px
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0 && onPrev) {
        onPrev();
      } else if (deltaX < 0 && onNext) {
        onNext();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div className="project-modal-backdrop" onClick={handleBackdropClick}>
      {/* Navigation arrows */}
      {onPrev && (
        <button
          className="project-modal-nav project-modal-prev"
          onClick={onPrev}
          aria-label="Previous project"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      )}

      <div
        className="project-modal"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
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
        <div className="modal-body" ref={modalBodyRef}>
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

          {/* Navigation footer */}
          <div className="modal-footer">
            <button
              className="modal-footer-nav"
              onClick={onPrev || undefined}
              disabled={!onPrev}
              aria-label="Previous project"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span className="modal-counter">
              {currentIndex + 1} / {totalCount}
            </span>
            <button
              className="modal-footer-nav"
              onClick={onNext || undefined}
              disabled={!onNext}
              aria-label="Next project"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>

      {onNext && (
        <button
          className="project-modal-nav project-modal-next"
          onClick={onNext}
          aria-label="Next project"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      )}
    </div>
  );
};

export default ProjectModal;
