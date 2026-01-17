import React from 'react';
import ProjectCard from '@/components/UI/ProjectCard';
import projectsData from '@/data/projects';

const Projects = () => {
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
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
