'use client';

import React, { useEffect, useRef, useState } from 'react';
import experienceData from '@/data/experience';
import TimelineItem from '@/components/UI/TimelineItem';
import BrandIcon from '@/components/UI/BrandIcon';
import type { TechStack, Experience as ExperienceType } from '@/types';

interface TechBadgeProps {
    tech: TechStack;
    index: number;
}

const TechBadge: React.FC<TechBadgeProps> = ({ tech, index }) => {
    const getIconUrl = (tech: TechStack): string | null => {
        if (tech.custom) {
            // Custom SVG icons for techs not in devicon
            return null;
        }
        const variant = tech.variant || 'original';
        return `/icons/devicons/${tech.icon}-${variant}.svg`;
    };

    const CustomIcon: React.FC<{ name: string }> = ({ name }) => {
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
        if (name === 'Linux') {
            return (
                <svg viewBox="0 0 448 512" className="tech-icon-svg tech-icon-linux">
                    {/* Tux the Linux penguin - colored */}
                    <defs>
                        <linearGradient id="tuxBelly" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#F5E6C8"/>
                            <stop offset="100%" stopColor="#E8D4A8"/>
                        </linearGradient>
                    </defs>
                    {/* Body (black) */}
                    <path fill="#1a1a1a" d="M220.8 123.3c1 .5 1.8 1.7 3 1.7 1.1 0 2.8-.4 2.9-1.5.2-1.4-1.9-2.3-3.2-2.9-1.7-.7-3.9-1-5.5-.1-.4.2-.8.7-.6 1.1.3 1.3 2.3 1.1 3.4 1.7zm-21.9 1.7c1.2 0 2-1.2 3-1.7 1.1-.6 3.1-.4 3.5-1.6.2-.4-.2-.9-.6-1.1-1.6-.9-3.8-.6-5.5.1-1.3.6-3.4 1.5-3.2 2.9.1 1 1.8 1.5 2.8 1.4zM420 403.8c-3.6-4-5.3-11.6-7.2-19.7-1.8-8.1-3.9-16.8-10.5-22.4-1.3-1.1-2.6-2.1-4-2.9-1.3-.8-2.7-1.5-4.1-2 9.2-27.3 5.6-54.5-3.7-79.1-11.4-30.1-31.3-56.4-46.5-74.4-17.1-21.5-33.7-41.9-33.4-72C311.1 85.4 315.7.1 234.8 0 132.4-.2 158 103.4 156.9 135.2c-1.7 23.4-6.4 41.8-22.5 64.7-18.9 22.5-45.5 58.8-58.1 96.7-6 17.9-8.8 36.1-6.2 53.3-6.5 5.8-11.4 14.7-16.6 20.2-4.2 4.3-10.3 5.9-17 8.3s-14 6-18.5 14.5c-2.1 3.9-2.8 8.1-2.8 12.4 0 3.9.6 7.9 1.2 11.8 1.2 8.1 2.5 15.7.8 20.8-5.2 14.4-5.9 24.4-2.2 31.7 3.8 7.3 11.4 10.5 20.1 12.3 17.3 3.6 40.8 2.7 59.3 12.5 19.8 10.4 39.9 14.1 55.9 10.4 11.6-2.6 21.1-9.6 25.9-20.2 12.5-.1 26.3-5.4 48.3-6.6 14.9-1.2 33.6 5.3 55.1 4.1.6 2.3 1.4 4.6 2.5 6.7v.1c8.3 16.7 23.8 24.3 40.3 23 16.6-1.3 34.1-11 48.3-27.9 13.6-16.4 36-23.2 50.9-32.2 7.4-4.5 13.4-10.1 13.9-18.3.4-8.2-4.4-17.3-15.5-29.7zM223.7 87.3c9.8-22.2 34.2-21.8 44-.4 6.5 14.2 3.6 30.9-4.3 40.4-1.6-.8-5.9-2.6-12.6-4.9 1.1-1.2 3.1-2.7 3.9-4.6 4.8-11.8-.2-27-9.1-27.3-7.3-.5-13.9 10.8-11.8 23-4.1-2-9.4-3.5-13-4.4-1-6.9-.3-14.6 2.9-21.8zM183 75.8c10.1 0 20.8 14.2 19.1 33.5-3.5 1-7.1 2.5-10.2 4.6 1.2-8.9-3.3-20.1-9.6-19.6-8.4.7-9.8 21.2-1.8 28.1 1 .8 1.9-.2-5.9 5.5-15.6-14.6-10.5-52.1 8.4-52.1zm-13.6 60.7c6.2-4.6 13.6-10 14.1-10.5 4.7-4.4 13.5-14.2 27.9-14.2 7.1 0 15.6 2.3 25.9 8.9 6.3 4.1 11.3 4.4 22.6 9.3 8.4 3.5 13.7 9.7 10.5 18.2-2.6 7.1-11 14.4-22.7 18.1-11.1 3.6-19.8 16-38.2 14.9-3.9-.2-7-1-9.6-2.1-8-3.5-12.2-10.4-20-15-8.6-4.8-13.2-10.4-14.7-15.3-1.4-4.9 0-9 4.2-12.3zm3.3 334c-2.7 35.1-43.9 34.4-75.3 18-29.9-15.8-68.6-6.5-76.5-21.9-2.4-4.7-2.4-12.7 2.6-26.4v-.2c2.4-7.6.6-16-.6-23.9-1.2-7.8-1.8-15 .9-20 3.5-6.7 8.5-9.1 14.8-11.3 10.3-3.7 11.8-3.4 19.6-9.9 5.5-5.7 9.5-12.9 14.3-18 5.1-5.5 10-8.1 17.7-6.9 8.1 1.2 15.1 6.8 21.9 16l19.6 35.6c9.5 19.9 43.1 48.4 41 68.9zm-30.5-17.2c-2-6.7-5.7-12.1-9.6-16.4-4.8-5.3-10-9.3-14.4-13.8l-16.2-29.5c-.3-.5-.6-.9-.9-1.4 4.1 11.3 15.6 24.6 26.3 31.6 7.5 4.9 12.5 14.7 14.8 29.5zm-19.7-27.9c-9.3-7.7-18.1-21.4-20.2-33.6 1.9 1.6 3.8 3.2 5.7 4.8 3.7 3.2 7.1 6.5 10.4 10.4 4.5 5.5 8.8 12 11.8 18.8-2.8-.1-5.4-.3-7.7-.4zm5.7-109.6c-.1 7.5-5.7 14.4-12.8 13.7-4.6-.5-10.1-3-13.3-7.6-3.3-4.5-4.8-11.1-2-17.8.5-1.2 1.1-2.3 1.8-3.4.1.9.3 1.8.4 2.6 1.6 10.4 12.6 17.9 22.3 14.5 1.2-.4 2.3-.9 3.3-1.5.2-.2.3.7.3-.5zm-28.4-13.8c-6.7-4.5-6.9-16.2-.7-19.4.4.2.8.4 1.1.7 3.2 2.3 6.1 5.1 8.8 8.1 2.2 2.5 4.2 5.1 6.1 7.8-4.4 6.3-10.6 6-15.3 2.8zm14.3-22.2c-5.9-7.5-11.7-16.2-12.7-20.8 4.5 6.3 8.9 12.3 14.1 19.3-.4.5-.9 1-1.4 1.5zm38.3-29.7c-.8 2.9-1.1 5.8-1 8.7.3 11 6.6 21.4 16.3 27.9-.5.8-1 1.7-1.4 2.5-6.1-4.3-11.4-10.2-14.6-17.3-2.5-5.4-3.5-11.3-2.9-17.1.2-1.6.5-3.1.9-4.5.6-.1 1.7-.1 2.7-.2z"/>
                    {/* Belly (cream/yellow) */}
                    <ellipse cx="224" cy="280" rx="65" ry="85" fill="url(#tuxBelly)"/>
                    {/* Feet (orange) */}
                    <ellipse cx="185" cy="460" rx="35" ry="15" fill="#E77F24"/>
                    <ellipse cx="263" cy="460" rx="35" ry="15" fill="#E77F24"/>
                    {/* Beak (orange) */}
                    <ellipse cx="224" cy="165" rx="18" ry="10" fill="#E77F24"/>
                    {/* Eyes (white with black pupil) */}
                    <ellipse cx="200" cy="130" rx="12" ry="14" fill="white"/>
                    <ellipse cx="248" cy="130" rx="12" ry="14" fill="white"/>
                    <circle cx="202" cy="132" r="6" fill="#1a1a1a"/>
                    <circle cx="246" cy="132" r="6" fill="#1a1a1a"/>
                </svg>
            );
        }
        // JavaScript uses BrandIcon
        if (name === 'JavaScript') {
            return <BrandIcon name="javascript" size={28} className="tech-icon-brand" />;
        }
        return null;
    };

    const isBrandIcon = tech.name === 'JavaScript';

    const iconUrl = getIconUrl(tech);

    return (
        <div
            className={`tech-badge ${isBrandIcon ? 'tech-badge-fa' : ''}`}
            style={{ animationDelay: `${0.5 + index * 0.15}s` }}
        >
            <div className="tech-icon-wrapper">
                {isBrandIcon ? (
                    <CustomIcon name={tech.name} />
                ) : iconUrl ? (
                    <img src={iconUrl} alt={tech.name} className="tech-icon" width={28} height={28} />
                ) : (
                    <CustomIcon name={tech.name} />
                )}
            </div>
            <span className="tech-name">{tech.name}</span>
        </div>
    );
};

interface ExperienceCardProps {
    experience: ExperienceType;
    index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

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

    const getExperienceYear = (exp: ExperienceType): number => {
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
