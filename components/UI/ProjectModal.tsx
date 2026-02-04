'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ExternalLink,
  BookOpen,
  CheckCircle,
  Briefcase,
  Building,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  Wrench,
  BarChart3,
  ArrowRight
} from 'lucide-react';
import ModalComponent from './ModalComponent';
import type { Project } from '@/types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev: (() => void) | null;
  onNext: (() => void) | null;
  currentIndex: number;
  totalCount: number;
  onNavigateToNextSection?: () => void;
}

const ProjectModal = ({ project, isOpen, onClose, onPrev, onNext, currentIndex, totalCount, onNavigateToNextSection }: ProjectModalProps) => {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevIndex = useRef<number>(currentIndex);

  // Detect navigation direction and trigger animation
  useEffect(() => {
    if (currentIndex !== prevIndex.current) {
      const direction = currentIndex > prevIndex.current ? 'left' : 'right';
      if (!swipeDirection) {
        setSwipeDirection(direction);
      }
      setIsAnimating(true);
      prevIndex.current = currentIndex;

      // Reset animation state after animation completes
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setSwipeDirection(null);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, swipeDirection]);

  const handleSwipeDirectionChange = (direction: 'left' | 'right' | null) => {
    setSwipeDirection(direction);
  };

  if (!project) return null;

  const isLastProject = !onNext;
  const IconComponent = project.icon;

  // On last project, replace next button with "Continue to Articles"
  const nextButtonOverride = isLastProject && onNavigateToNextSection ? (
    <button
      className="project-modal-next-section-btn"
      onClick={onNavigateToNextSection}
    >
      Articles
      <ArrowRight size={16} />
    </button>
  ) : undefined;

  const headerContent = (
    <>
      <div className="modal-icon">
        <IconComponent size={28} />
      </div>
      <div className="modal-title-section">
        <h2 className="modal-title">{project.title}</h2>
        <div className="modal-meta">
          <span className={`status-badge ${project.status}`}>
            {project.status === 'production' ? 'In Production' : 'Proof of Concept'}
          </span>
          <span className="company-badge">
            <Building size={14} />
            {project.company}
          </span>
        </div>
      </div>
    </>
  );

  return (
    <ModalComponent
      isOpen={isOpen}
      onClose={onClose}
      onPrev={onPrev}
      onNext={onNext}
      currentIndex={currentIndex}
      totalCount={totalCount}
      config={{
        maxWidth: 'md',
        variant: 'project',
        showHeader: true,
        showSideNav: true,
        showNavPulse: false,
        showFooter: true,
        decorativeNav: false,
      }}
      headerContent={headerContent}
      nextButtonOverride={nextButtonOverride}
      onSwipeDirectionChange={handleSwipeDirectionChange}
      contentClassName={isAnimating ? `swipe-${swipeDirection}` : ''}
    >
      {/* Role Section */}
      <div className="modal-role-section">
        <div className="role-header">
          <Briefcase size={16} />
          <span>My Role: <strong>{project.role}</strong></span>
        </div>
      </div>

      {/* Problem Section */}
      {project.problem && (
        <div className="modal-section problem-section">
          <h3>
            <HelpCircle size={18} />
            The Challenge
          </h3>
          <p>{project.problem}</p>
        </div>
      )}

      {/* Solution Section */}
      {project.solution && (
        <div className="modal-section solution-section">
          <h3>
            <Wrench size={18} />
            The Solution
          </h3>
          <p>{project.solution}</p>
        </div>
      )}

      {/* Impact Section */}
      {project.impact && (
        <div className="modal-section impact-section">
          <h3>
            <BarChart3 size={18} />
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
          <Wrench size={18} />
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
            <CheckCircle size={18} />
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
            <Lightbulb size={18} />
            What I Learned
          </h3>
          <p>{project.learnings}</p>
        </div>
      )}

      {/* Note for POC projects */}
      {project.note && (
        <div className="modal-note">
          <AlertTriangle size={18} />
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
              <ExternalLink size={16} />
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
              <BookOpen size={16} />
              Read Blog Post
            </a>
          )}
        </div>
      )}
    </ModalComponent>
  );
};

export default ProjectModal;
