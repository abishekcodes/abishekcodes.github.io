'use client';

import React, { useState, useEffect, CSSProperties } from 'react';
import {
  Cloud,
  Database,
  Code,
  Rocket,
  Terminal,
  Settings,
  TrendingUp,
  Users,
  Cpu,
  Zap,
  GitBranch,
  Bot,
  Workflow,
  LucideIcon
} from 'lucide-react';
import BrandIcon from '@/components/UI/BrandIcon';
import type { BrandIconName } from '@/components/UI/BrandIcon';

// Calculate years of experience at build time (starting November 29, 2016)
const START_DATE = new Date(2016, 10, 29);
const YEARS_OF_EXPERIENCE = Math.floor((new Date().getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

interface TechIcon {
  icon?: LucideIcon;
  brandIcon?: BrandIconName;
  color: string;
  name: string;
}

interface Achievement {
  icon: LucideIcon;
  text: string;
  color: string;
}

interface DescriptionLine {
  icon: LucideIcon;
  text: React.ReactNode;
}

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [descVisible, setDescVisible] = useState(true);

  const roles = [
    { title: "Tech Lead", category: "leadership" },
    { title: "AWS Cloud Architect", category: "cloud" },
    { title: "Python Developer", category: "development" },
    { title: "DevOps Engineer", category: "development" },
    { title: "Mentor", category: "leadership" }
  ];

  const roleDescriptions: DescriptionLine[][] = [
    // Tech Lead
    [
      { icon: Users,     text: <>Led a <strong>5-engineer team</strong> delivering systems that processed 4B+ API requests</> },
      { icon: Rocket,    text: <>Shipped <strong>zero-downtime deployments</strong> and billing systems handling real money at scale</> },
      { icon: TrendingUp,text: <>Drove engineering culture through <strong>code reviews, mentoring</strong> and cross-functional ownership</> },
    ],
    // AWS Cloud Architect
    [
      { icon: Cloud,     text: <>Designed scalable infra on <strong>EC2, S3, Lambda & ECS</strong> for high-traffic production systems</> },
      { icon: TrendingUp,text: <>Cut AWS spend by <strong>50% — from $18K to $9K/month</strong> through architectural optimisation</> },
      { icon: Settings,  text: <>Implemented <strong>canary deployments</strong> and infrastructure automation across environments</> },
    ],
    // Python Developer
    [
      { icon: Code,      text: <>Built <strong>REST & GraphQL APIs</strong> with Flask, Aiohttp & Ariadne handling 50K req/hour</> },
      { icon: Database,  text: <>Engineered pipelines on <strong>Cassandra, DynamoDB & Redshift</strong> storing 13 years of cricket data</> },
      { icon: Cpu,       text: <>Delivered <strong>high-performance Python services</strong> powering CricketAPI's 4B+ lifetime requests</> },
    ],
    // DevOps Engineer
    [
      { icon: GitBranch, text: <>Automated CI/CD with <strong>zero-downtime canary deployments</strong> on AWS ECS</> },
      { icon: Settings,  text: <>Managed production infra across <strong>EC2, ECS, Lambda & S3</strong> for multi-tenant services</> },
      { icon: Rocket,    text: <>Kept production APIs <strong>running reliably</strong> while processing billions of requests since 2019</> },
    ],
    // Mentor
    [
      { icon: Users,     text: <>Grew a <strong>5-engineer team</strong> from juniors to independent contributors at Roanuz</> },
      { icon: Code,      text: <>Established <strong>code review culture</strong> and engineering best practices org-wide</> },
      { icon: TrendingUp,text: <>Guided engineers from <strong>concept to production</strong> on systems used by millions</> },
    ],
  ];

  const techIcons: TechIcon[] = [
    { icon: Zap, color: "#009688", name: "FastAPI" },
    { icon: Workflow, color: "#FF6F00", name: "LangGraph" },
    { icon: Bot, color: "#7C4DFF", name: "CrewAI" },
    { icon: GitBranch, color: "#326CE5", name: "Kubernetes" }
  ];

  // Floating background icons covering all skillsets
  const floatingIcons: TechIcon[] = [
    // Row 1 - Agentic AI
    { icon: Bot, color: "#7C4DFF", name: "AI" },
    { icon: Workflow, color: "#FF6F00", name: "LangGraph" },
    { icon: Bot, color: "#9C27B0", name: "AI2" },
    // Row 2 - AWS & Cloud
    { brandIcon: "aws", color: "#FF9900", name: "AWS" },
    { icon: Cloud, color: "#4FC3F7", name: "Cloud" },
    { brandIcon: "aws", color: "#FF9900", name: "AWS2" },
    { icon: Cloud, color: "#00BCD4", name: "Cloud2" },
    // Row 3 - Python & Development
    { brandIcon: "python", color: "#3776AB", name: "Python" },
    { icon: Code, color: "#00BCD4", name: "Code" },
    { icon: Terminal, color: "#4CAF50", name: "Terminal" },
    { brandIcon: "python", color: "#3776AB", name: "Python2" },
    // Row 4 - DevOps
    { brandIcon: "docker", color: "#2496ED", name: "Docker" },
    { icon: GitBranch, color: "#326CE5", name: "Kubernetes" },
    { brandIcon: "git", color: "#F05032", name: "Git" },
    { brandIcon: "docker", color: "#2496ED", name: "Docker2" },
    // Row 5 - Database & Data
    { icon: Database, color: "#00ACC1", name: "Database" },
    { icon: TrendingUp, color: "#9C27B0", name: "Analytics" },
    { icon: Database, color: "#4CAF50", name: "Database2" },
    // Row 6 - Leadership & API
    { icon: Users, color: "#E91E63", name: "Leadership" },
    { icon: Zap, color: "#009688", name: "FastAPI" },
    { icon: Settings, color: "#607D8B", name: "DevOps" },
    { icon: Rocket, color: "#FF5722", name: "Deploy" },
    // Additional scattered icons
    { icon: Code, color: "#4CAF50", name: "Code2" },
    { icon: Terminal, color: "#FF9800", name: "Terminal2" },
    { icon: Settings, color: "#795548", name: "DevOps2" },
    { icon: Rocket, color: "#E91E63", name: "Deploy2" }
  ];

  const achievements: Achievement[] = [
    { icon: Rocket, text: "Zero-downtime canary deployments", color: "#FF6B6B" },
    { icon: TrendingUp, text: "50% AWS cost reduction ($18K to $9K)", color: "#4ECDC4" },
    { icon: Users, text: "Led 5-engineer cross-functional teams", color: "#45B7D1" },
    { icon: Settings, text: "4B+ API requests processed (2019-2025)", color: "#96CEB4" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setDescVisible(false);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
        setDescVisible(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderIcon = (tech: TechIcon, size: number = 24) => {
    if (tech.brandIcon) {
      return <BrandIcon name={tech.brandIcon} size={size} />;
    }
    if (tech.icon) {
      const IconComponent = tech.icon;
      return <IconComponent size={size} />;
    }
    return null;
  };

  return (
    <section id="home" className="hero-enhanced">
      <div className="floating-icons">
        {floatingIcons.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="floating-icon"
            style={{
              animationDelay: `${index * 0.3}s`,
              '--icon-color': tech.color
            } as CSSProperties}
          >
            {renderIcon(tech)}
          </div>
        ))}
      </div>

      <div className="hero-container">
        <div className="hero-main">
          <div className="hero-greeting">
            <span className="wave">👋</span> Hey there, I'm
          </div>

          <h1 className="hero-name-large">
            <span className="first-name">Abishek</span>
            <span className="last-name">Moses Raj</span>
          </h1>

          <div className="hero-role-container">
            <span className="role-prefix">I'm a </span>
            <span className={`hero-role ${isTyping ? 'typing' : 'deleting'} role-${roles[currentRole].category}`}>
              {roles[currentRole].title}
            </span>
            <span className={`cursor cursor-${roles[currentRole].category}`}>|</span>
          </div>

          <div className={`hero-description-new ${descVisible ? 'desc-visible' : 'desc-hidden'}`}>
            {roleDescriptions[currentRole].map((line, i) => {
              const Icon = line.icon;
              return (
                <p key={i} className="description-line">
                  <Icon size={18} className="inline-icon" />
                  <span className="description-text">{line.text}</span>
                </p>
              );
            })}
          </div>

          <div className="cta-buttons-new">
            <button
              className="btn-primary-new"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Rocket size={18} />
              Explore My Work
            </button>
            <a
              href="https://linkedin.com/in/abishekmosesraj"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-new"
            >
              <span>Let's Build Something</span>
              <Code size={18} />
            </a>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-number">{YEARS_OF_EXPERIENCE}</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5+</div>
              <div className="stat-label">Projects Delivered</div>
            </div>
          </div>

          <div className="achievement-badges">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={index}
                  className="achievement-badge"
                  style={{
                    animationDelay: `${index * 0.2}s`,
                    '--badge-color': achievement.color
                  } as CSSProperties}
                >
                  <IconComponent size={16} />
                  <span>{achievement.text}</span>
                </div>
              );
            })}
          </div>

          <div className="tech-preview">
            <div className="tech-preview-title">Currently Working With</div>
            <div className="tech-icons-grid">
              {techIcons.map((tech) => (
                <div
                  key={tech.name}
                  className="tech-icon-item"
                  style={{ '--tech-color': tech.color } as CSSProperties}
                >
                  {renderIcon(tech, 20)}
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <div className="scroll-text">Scroll to explore</div>
      </div>
    </section>
  );
};

export default Hero;
