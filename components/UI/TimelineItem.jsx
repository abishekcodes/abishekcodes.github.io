import React from 'react';

const TimelineItem = ({ experience }) => {
    const {
        company,
        position,
        duration,
        location,
        achievements
    } = experience;

    const parseLocation = (locationStr) => {
        if (!locationStr) return '';

        const parts = locationStr.split(',');
        if (parts.length >= 2) {
            return `${parts[0].trim()}, ${parts[1].trim()}`;
        }
        return locationStr;
    };

    return (
        <div className="timeline-card">
            <div className="timeline-header">
                <div className="company-name">{company}</div>
                <h3 className="job-title">{position}</h3>
                <div className="job-duration">{duration}</div>
                {location && (
                    <div className="job-location">
                        📍 {parseLocation(location)}
                    </div>
                )}
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