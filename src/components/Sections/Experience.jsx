import React, { useEffect, useRef, useState } from 'react';
import experienceData from '../../data/experience';
import TimelineItem from '../UI/TimelineItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinux, faJs } from '@fortawesome/free-brands-svg-icons';

const TechBadge = ({ tech, index }) => {
    const getIconUrl = (tech) => {
        if (tech.custom) {
            // Custom SVG icons for techs not in devicon
            return null;
        }
        const variant = tech.variant || 'original';
        return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.icon}/${tech.icon}-${variant}.svg`;
    };

    const CustomIcon = ({ name }) => {
        // LangGraph - graph/network nodes icon
        if (name === 'LangGraph') {
            return (
                <svg viewBox="0 0 24 24" className="tech-icon-svg">
                    <path fill="currentColor" d="M12 2a3 3 0 0 0-3 3c0 1.12.61 2.1 1.52 2.62L9.5 10H6a3 3 0 1 0 0 2h3.5l1.02 2.38A3 3 0 0 0 9 17a3 3 0 1 0 4.48-2.62L14.5 12H18a3 3 0 1 0 0-2h-3.5l-1.02-2.38A3 3 0 0 0 15 5a3 3 0 0 0-3-3zm0 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM5 10a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm14 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-7 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
            );
        }
        // CrewAI - team/agents icon
        if (name === 'CrewAI') {
            return (
                <svg viewBox="0 0 24 24" className="tech-icon-svg">
                    <path fill="currentColor" d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2m0 7c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1M4.5 9a2.5 2.5 0 0 1 0-5c.55 0 1.06.18 1.47.5a3.96 3.96 0 0 0-.92 3.27A2.49 2.49 0 0 1 4.5 9m15 0a2.49 2.49 0 0 1-.55-1.23 3.96 3.96 0 0 0-.92-3.27c.41-.32.92-.5 1.47-.5a2.5 2.5 0 0 1 0 5z"/>
                </svg>
            );
        }
        // LangChain - chain links icon
        if (name === 'LangChain') {
            return (
                <svg viewBox="0 0 24 24" className="tech-icon-svg">
                    <path fill="currentColor" d="M10.59 13.41c.41.39.41 1.03 0 1.42-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0 5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 0 0 0-4.24 2.982 2.982 0 0 0-4.24 0l-3.53 3.53a2.982 2.982 0 0 0 0 4.24m2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0 5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.982 2.982 0 0 0 0 4.24 2.982 2.982 0 0 0 4.24 0l3.53-3.53a2.982 2.982 0 0 0 0-4.24.973.973 0 0 1 0-1.42z"/>
                </svg>
            );
        }
        // AWS Lambda icon
        if (name === 'Lambda') {
            return (
                <svg viewBox="0 0 24 24" className="tech-icon-svg">
                    <path fill="currentColor" d="M4.948 2H9.62l8.27 18.63h-4.672L4.948 2zM14.55 2h4.672l-4.84 10.907-2.336-5.262L14.55 2zM2 20.63h4.83l2.336-5.262H4.336L2 20.63z"/>
                </svg>
            );
        }
        // AWS ECS icon (container)
        if (name === 'ECS') {
            return (
                <svg viewBox="0 0 24 24" className="tech-icon-svg">
                    <path fill="currentColor" d="M12.954 1.073L4.77 5.636v12.728l8.184 4.563 8.184-4.563V5.636l-8.184-4.563zm5.89 15.578l-5.89 3.284-5.89-3.284V7.349l5.89-3.284 5.89 3.284v9.302zm-5.89-7.36L9.29 11.4v4.218l3.665 2.109 3.665-2.109V11.4l-3.665-2.109z"/>
                </svg>
            );
        }
        // AWS EC2 icon (server)
        if (name === 'EC2') {
            return (
                <svg viewBox="0 0 24 24" className="tech-icon-svg">
                    <path fill="currentColor" d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h6v2H7v-2z"/>
                </svg>
            );
        }
        // Cassandra icon (database rings)
        if (name === 'Cassandra') {
            return (
                <svg viewBox="0 0 24 24" className="tech-icon-svg">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.14-7-7 3.14-7 7-7zm0 2.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 2a2.5 2.5 0 110 5 2.5 2.5 0 010-5z"/>
                </svg>
            );
        }
        // Aiohttp icon (async lightning)
        if (name === 'Aiohttp') {
            return (
                <svg viewBox="0 0 24 24" className="tech-icon-svg">
                    <path fill="currentColor" d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/>
                </svg>
            );
        }
        // JavaScript and Linux use FontAwesome
        if (name === 'JavaScript' || name === 'Linux') {
            return null; // Handled separately with FontAwesome
        }
        return null;
    };

    const getFontAwesomeIcon = (name) => {
        if (name === 'JavaScript') return faJs;
        if (name === 'Linux') return faLinux;
        return null;
    };

    const isFontAwesome = tech.name === 'JavaScript' || tech.name === 'Linux';

    const iconUrl = getIconUrl(tech);

    const faIcon = getFontAwesomeIcon(tech.name);

    return (
        <div
            className={`tech-badge ${isFontAwesome ? 'tech-badge-fa' : ''}`}
            style={{ animationDelay: `${0.5 + index * 0.15}s` }}
        >
            <div className="tech-icon-wrapper">
                {isFontAwesome && faIcon ? (
                    <FontAwesomeIcon icon={faIcon} className="tech-icon-fa" />
                ) : iconUrl ? (
                    <img src={iconUrl} alt={tech.name} className="tech-icon" />
                ) : (
                    <CustomIcon name={tech.name} />
                )}
            </div>
            <span className="tech-name">{tech.name}</span>
        </div>
    );
};

const ExperienceCard = ({ experience, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const element = cardRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Small delay for staggered effect
                    setTimeout(() => setIsVisible(true), 100);
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -150px 0px' // Trigger when card is 150px from bottom
            }
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

    const isEven = index % 2 === 0;

    return (
        <div
            ref={cardRef}
            className={`timeline-item ${isVisible ? 'revealed' : ''} ${isEven ? 'timeline-left' : 'timeline-right'}`}
        >
            <div className="timeline-connector"></div>
            <div className="timeline-dot">
                <span className="dot-year">{year}</span>
            </div>
            <TimelineItem experience={experience} />

            {/* Floating tech stack on opposite side */}
            {experience.techStack && (
                <div className="timeline-tech-stack">
                    {experience.techStack.map((tech, i) => (
                        <TechBadge key={i} tech={tech} index={i} />
                    ))}
                </div>
            )}
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
