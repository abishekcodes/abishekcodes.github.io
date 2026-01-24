'use client';

import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt, faCloud, faDatabase, faMemory, faArrowRight, faClock, faFire } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ArticleData {
  id: number;
  title: string;
  hook: string;
  description: string;
  icon: IconDefinition;
  color: string;
  gradient: string;
  url: string;
  tags: string[];
  readTime: string;
  featured?: boolean;
}

const articlesData: ArticleData[] = [
  {
    id: 1,
    title: 'AWS API Infrastructure That Prevents 3AM Wake-Up Calls',
    hook: '"Your API is down" - three words no engineer wants to hear at 3AM.',
    description: 'Building resilient AWS API infrastructure with proper monitoring, auto-scaling, and failover strategies that let you sleep peacefully.',
    icon: faCloud,
    color: '#FF9900',
    gradient: 'linear-gradient(135deg, #FF9900 0%, #FF6B00 100%)',
    url: 'https://www.linkedin.com/pulse/aws-api-infrastructure-prevents-3am-wake-up-calls-part-moses-raj-p3xxc',
    tags: ['AWS', 'Infrastructure', 'DevOps'],
    readTime: '8 min read'
  },
  {
    id: 2,
    title: 'What Memcache and a Concert Have in Common',
    hook: 'Imagine 10,000 fans trying to buy tickets at once...',
    description: 'Understanding caching concepts through real-world analogies - because the best explanations are the ones you remember.',
    icon: faMemory,
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    url: 'https://www.linkedin.com/pulse/what-memcache-vijay-antony-concert-have-common-abishek-moses-raj-rdxnc',
    tags: ['Caching', 'Architecture'],
    readTime: '5 min read'
  },
  {
    id: 3,
    title: 'Is Your Data Easy to Find?',
    hook: 'Finding data without indexes is like searching for a book in an unsorted library.',
    description: 'A storytelling approach to database optimization - making complex indexing concepts intuitive and memorable.',
    icon: faDatabase,
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    url: 'https://www.linkedin.com/pulse/great-address-quest-understanding-mongodb-indexes-story-moses-raj-fnlcc',
    tags: ['MongoDB', 'Performance'],
    readTime: '6 min read',
    featured: true
  }
];

interface ArticleProps {
  article: ArticleData;
}

const FeaturedArticle: React.FC<ArticleProps> = ({ article }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <a
      ref={cardRef}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`featured-article ${isVisible ? 'article-card-visible' : ''}`}
      style={{ '--article-gradient': article.gradient, '--article-color': article.color } as CSSProperties}
    >
      <div className="featured-badge">
        <FontAwesomeIcon icon={faFire} />
        <span>Featured</span>
      </div>

      <div className="featured-icon-side">
        <FontAwesomeIcon icon={article.icon} className="featured-icon" />
      </div>

      <div className="featured-content">
        <div className="featured-hook">{article.hook}</div>
        <h3 className="featured-title">{article.title}</h3>
        <p className="featured-description">{article.description}</p>

        <div className="featured-footer">
          <div className="article-tags">
            {article.tags.map((tag, idx) => (
              <span key={idx} className="article-tag">{tag}</span>
            ))}
          </div>
          <div className="featured-meta">
            <span className="read-time">
              <FontAwesomeIcon icon={faClock} />
              {article.readTime}
            </span>
            <span className="read-more">
              Read Article
              <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

interface ArticleCardProps {
  article: ArticleData;
  index: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <a
      ref={cardRef}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`article-card ${isVisible ? 'article-card-visible' : ''}`}
      style={{ '--article-gradient': article.gradient, '--article-color': article.color } as CSSProperties}
    >
      <div className="article-icon-wrapper">
        <FontAwesomeIcon icon={article.icon} className="article-main-icon" />
      </div>

      <div className="article-content">
        <div className="article-hook">{article.hook}</div>
        <h3 className="article-title">{article.title}</h3>
        <p className="article-description">{article.description}</p>

        <div className="article-footer">
          <div className="article-tags">
            {article.tags.map((tag, idx) => (
              <span key={idx} className="article-tag">{tag}</span>
            ))}
          </div>
          <div className="article-meta">
            <span className="read-time">
              <FontAwesomeIcon icon={faClock} />
              {article.readTime}
            </span>
          </div>
        </div>
      </div>

      <div className="article-hover-bar">
        <span>Read Article</span>
        <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
      </div>
    </a>
  );
};

const Articles = () => {
  const featuredArticle = articlesData.find(a => a.featured);
  const otherArticles = articlesData.filter(a => !a.featured);

  return (
    <section id="articles" className="articles">
      <div className="articles-container">
        <div className="articles-header">
          <p className="articles-eyebrow">Insights</p>
          <h2 className="articles-title">Technical Articles</h2>
          <p className="articles-subtitle">
            Complex concepts explained through stories and real-world analogies
          </p>
        </div>

        {featuredArticle && (
          <FeaturedArticle article={featuredArticle} />
        )}

        <div className="articles-grid">
          {otherArticles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>

        <div className="articles-cta">
          <a
            href="https://www.linkedin.com/in/abishekmosesraj/recent-activity/articles/"
            target="_blank"
            rel="noopener noreferrer"
            className="view-all-link"
          >
            <FontAwesomeIcon icon={faLinkedin} className="linkedin-icon" />
            <span>View All on LinkedIn</span>
            <FontAwesomeIcon icon={faExternalLinkAlt} className="external-icon" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Articles;
