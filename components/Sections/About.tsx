'use client';

import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faCode, faRocket, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about-container">
        <div className="about-header">
          <p className="about-eyebrow">About Me</p>
          <h2 className="about-title">The Story So Far</h2>
        </div>

        <div className="about-content">
          <div className={`about-story ${isVisible ? 'about-story-visible' : ''}`}>
            <div className="story-card">
              <p>
                It started at <span className="company-name">Amazon</span>, where I joined as an ML Data Associate. Beyond the core role,
                I built internal tools using Flask and SQLite for my team, and got the opportunity
                to work with the Kindle Team on an Ion Viewer. That taste of building real software
                sparked something - I wanted more.
              </p>
            </div>

            <div className="story-card">
              <p>
                So I joined <span className="company-name">Roanuz</span>, where a small team was building something ambitious. Over six years,
                I grew from writing production Python code to leading a team of five engineers,
                architecting systems that would eventually handle 4 billion API requests. Those years
                taught me everything - from debugging 3 AM production issues to designing billing
                systems that process real money.
              </p>
            </div>

            <div className="story-card">
              <p>
                Today, I'm a Senior Consultant at <span className="company-name">Thoughtworks</span>, and I keep seeking
                new frontiers. After years of API development, I've dived into the world of LLMs,
                building AI agents with LangGraph and CrewAI. What drives me hasn't changed - a deep
                curiosity and admiration for people who find innovative ways to solve problems.
                Whether it's a database query or an AI agent, I find joy in building elegant solutions
                to complex challenges.
              </p>
            </div>
          </div>

          <div className={`about-highlights ${isVisible ? 'about-highlights-visible' : ''}`}>
            <div className="highlight-card" style={{ '--delay': '0s' } as CSSProperties}>
              <div className="highlight-icon">
                <FontAwesomeIcon icon={faLightbulb} />
              </div>
              <div className="highlight-content">
                <h3>Curious Mind</h3>
                <p>Always exploring new technologies and approaches to solve problems more elegantly.</p>
              </div>
            </div>
            <div className="highlight-card" style={{ '--delay': '0.1s' } as CSSProperties}>
              <div className="highlight-icon">
                <FontAwesomeIcon icon={faCode} />
              </div>
              <div className="highlight-content">
                <h3>Craft-Focused</h3>
                <p>I believe in writing clean, maintainable code that stands the test of time.</p>
              </div>
            </div>
            <div className="highlight-card" style={{ '--delay': '0.2s' } as CSSProperties}>
              <div className="highlight-icon">
                <FontAwesomeIcon icon={faRocket} />
              </div>
              <div className="highlight-content">
                <h3>Impact-Driven</h3>
                <p>Focused on building solutions that create real value and scale to millions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
