import React from 'react';
import type { Experience } from '@/types';

interface TimelineItemProps {
    experience: Experience;
}

const TimelineItem = ({ experience }: TimelineItemProps) => {
    const {
        company,
        position,
        duration,
        achievements
    } = experience;

    return (
        <div className="timeline-card">
            <div className="timeline-header">
                <div className="company-name">{company}</div>
                <h3 className="job-title">{position}</h3>
                <div className="job-duration">{duration}</div>
            </div>

            <ul className="timeline-achievements">
                {achievements.map((achievement, index) => (
                    <li key={index}>
                        {achievement}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TimelineItem;