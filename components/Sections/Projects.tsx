'use client';

import React, { useState, useEffect, useMemo } from 'react';
import ProjectCard from '@/components/UI/ProjectCard';
import ProjectModal from '@/components/UI/ProjectModal';
import projectsData from '@/data/projects';
import type { Project } from '@/types';

const Projects = () => {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

    // Build project ID to index map for O(1) lookups
    const projectsMap = useMemo(() => {
        const map = new Map<string, number>();
        projectsData.forEach((project, index) => {
            map.set(project.id, index);
        });
        return map;
    }, []);

    // Update URL with project parameter
    const updateProjectUrl = (index: number | null) => {
        const url = new URL(window.location.href);
        if (index !== null && projectsData[index]) {
            url.searchParams.set('project', projectsData[index].id);
        } else {
            url.searchParams.delete('project');
        }
        window.history.replaceState({}, '', url);
    };

    // Check URL for project param on load
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('project');
        if (projectId && projectsMap.has(projectId)) {
            const index = projectsMap.get(projectId);
            if (index !== undefined) {
                setSelectedProjectIndex(index);
            }
        }
    }, [projectsMap]);

    const handleCardClick = (project: Project) => {
        const index = projectsMap.get(project.id);
        if (index !== undefined) {
            setSelectedProjectIndex(index);
            updateProjectUrl(index);
        }
    };

    const handleCloseModal = () => {
        setSelectedProjectIndex(null);
        updateProjectUrl(null);
    };

    const handlePrev = () => {
        if (selectedProjectIndex !== null && selectedProjectIndex > 0) {
            const newIndex = selectedProjectIndex - 1;
            setSelectedProjectIndex(newIndex);
            updateProjectUrl(newIndex);
        }
    };

    const handleNext = () => {
        if (selectedProjectIndex !== null && selectedProjectIndex < projectsData.length - 1) {
            const newIndex = selectedProjectIndex + 1;
            setSelectedProjectIndex(newIndex);
            updateProjectUrl(newIndex);
        }
    };

    const selectedProject = selectedProjectIndex !== null ? projectsData[selectedProjectIndex] : null;

    return (
        <section id="projects" className="projects">
            <div className="projects-container">
                <div className="projects-header">
                    <p className="projects-eyebrow">Portfolio</p>
                    <h2 className="projects-title">Featured Projects</h2>
                    <p className="projects-subtitle">
                        Solutions I've built that made a real impact
                    </p>
                </div>
                <div className="projects-grid">
                    {projectsData.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            onCardClick={handleCardClick}
                        />
                    ))}
                </div>
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={selectedProject !== null}
                onClose={handleCloseModal}
                onPrev={selectedProjectIndex !== null && selectedProjectIndex > 0 ? handlePrev : null}
                onNext={selectedProjectIndex !== null && selectedProjectIndex < projectsData.length - 1 ? handleNext : null}
                currentIndex={selectedProjectIndex ?? 0}
                totalCount={projectsData.length}
            />
        </section>
    );
};

export default Projects;
