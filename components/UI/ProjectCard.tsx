'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, ArrowRight } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectCardProps {
    project: Project;
    index: number;
    onCardClick: (project: Project) => void;
}

const ProjectCard = ({ project, index, onCardClick }: ProjectCardProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const IconComponent = project.icon;

    useEffect(() => {
      const element = cardRef.current;
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Staggered delay based on index
            setTimeout(() => setIsVisible(true), index * 150);
            observer.unobserve(element);
          }
        },
        { threshold: 0.15 }
      );

      observer.observe(element);
      return () => observer.disconnect();
    }, [index]);

    return (
      <div
        ref={cardRef}
        className={`project-card ${isVisible ? 'project-card-visible' : ''}`}
        onClick={() => onCardClick(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onCardClick(project)}
      >
        <div className="project-header">
          <span className="project-icon">
            <IconComponent size={48} />
          </span>
          <span className={`project-status ${project.status}`}>
            {project.status === 'production' ? 'Live' : 'POC'}
          </span>
        </div>
        <div className="project-content">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>

          <div className="project-role">
            <Briefcase size={14} className="role-icon" />
            <span className="role-text">{project.role}</span>
          </div>

          <div className="tech-stack">
            {project.techStack.slice(0, 4).map((tech, idx) => (
              <span key={idx} className="tech-tag">{tech}</span>
            ))}
            {project.techStack.length > 4 && (
              <span className="tech-tag tech-more">+{project.techStack.length - 4}</span>
            )}
          </div>

          <div className="project-cta">
            <span>View Details</span>
            <ArrowRight size={14} className="cta-icon" />
          </div>
        </div>
      </div>
    );
  };

export default ProjectCard;
