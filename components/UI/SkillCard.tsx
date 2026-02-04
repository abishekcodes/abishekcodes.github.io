'use client';

import React, { useState, useEffect } from 'react';
import type { Skill } from '@/types';

interface SkillCardProps {
    skill: Skill;
    index: number;
}

const SkillCard = ({ skill, index }: SkillCardProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const IconComponent = skill.icon;

    useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), index * 200);
      return () => clearTimeout(timer);
    }, [index]);

    return (
      <div className={`skill-card ${isVisible ? 'skill-card-visible' : ''}`}>
        <div className="skill-icon"><IconComponent size={32} /></div>
        <h3 className="skill-title">{skill.title}</h3>
        <p className="skill-description">{skill.description}</p>
      </div>
    );
  };

export default SkillCard;
