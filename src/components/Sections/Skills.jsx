import React from 'react';
import skillsData from '../../data/skills';
import SkillCard from '../UI/SkillCard';

const Skills = () => {
    return (
        <section id="skills" className="skills">
            <div className="skills-container">
                <div className="skills-header">
                    <p className="skills-eyebrow">Expertise</p>
                    <h2 className="skills-title">Core Competencies</h2>
                    <p className="skills-subtitle">
                        Technologies and skills I've mastered over the years
                    </p>
                </div>
                <div className="skills-grid">
                    {skillsData.map((skill, index) => (
                        <SkillCard key={skill.id} skill={skill} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
