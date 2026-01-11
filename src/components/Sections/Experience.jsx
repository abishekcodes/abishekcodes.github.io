import React, { useEffect, useRef, useState } from 'react';
import experienceData from '../../data/experience';
import TimelineItem from '../UI/TimelineItem';

const ExperienceCard = ({ experience, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const element = cardRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), index * 150);
                    observer.unobserve(element);
                }
            },
            { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [index]);

    const getExperienceYear = (exp) => {
        const parts = exp.duration.split(' - ');
        const startPart = parts[0].trim();
        if (startPart.includes(' ')) {
            return parseInt(startPart.split(' ')[1]);
        }
        return parseInt(startPart);
    };

    const year = getExperienceYear(experience);

    return (
        <div
            ref={cardRef}
            className={`timeline-item ${isVisible ? 'revealed' : ''}`}
        >
            <div className="timeline-dot">
                <span className="dot-year">{year}</span>
            </div>
            <TimelineItem experience={experience} />
        </div>
    );
};

const Experience = () => {
    return (
        <section id="experience" className="experience">
            <div className="experience-container">
                <div className="experience-header">
                    <p className="experience-eyebrow">Career</p>
                    <h2 className="experience-title">Professional Journey</h2>
                    <p className="experience-subtitle">
                        Building scalable systems. Leading teams. Driving impact.
                    </p>
                </div>

                <div className="timeline">
                    {experienceData.map((experience, index) => (
                        <ExperienceCard
                            key={experience.id}
                            experience={experience}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
