'use client';

import React, { useState, useEffect, useRef } from 'react';
import ModalComponent from '@/components/UI/ModalComponent';
import '@/styles/Sections/poetry.css';
import type { Poem } from '@/types';

interface RSSItem {
  title: string;
  content?: string;
  description?: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
}

const Poetry: React.FC = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [poemsMap, setPoemsMap] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPoemIndex, setSelectedPoemIndex] = useState<number | null>(null);

  // Generate URL-friendly slug from Medium URL
  // Takes the path after medium.com and replaces / with __
  const generateSlug = (link: string): string => {
    try {
      const url = new URL(link);
      // Get pathname and remove leading slash, then replace remaining slashes with __
      const path = url.pathname.substring(1).replace(/\//g, '__');
      return path;
    } catch {
      // Fallback: extract path from link string
      const match = link.match(/medium\.com\/(.+)/);
      if (match) {
        return match[1].replace(/\//g, '__');
      }
      return '';
    }
  };

  // Update URL with poem parameter
  const updatePoemUrl = (index: number | null, poemsList: Poem[] = poems): void => {
    const url = new URL(window.location.href);
    if (index !== null && poemsList[index]) {
      const slug = generateSlug(poemsList[index].link);
      url.searchParams.set('poem', slug);
    } else {
      url.searchParams.delete('poem');
    }
    window.history.replaceState({}, '', url);
  };

  // Check URL for poem param on load (uses poemsMap for O(1) lookup)
  useEffect(() => {
    if (poemsMap.size > 0) {
      const urlParams = new URLSearchParams(window.location.search);
      const poemSlug = urlParams.get('poem');
      if (poemSlug && poemsMap.has(poemSlug)) {
        const index = poemsMap.get(poemSlug);
        if (index !== undefined) {
          setSelectedPoemIndex(index);
        }
      }
    }
  }, [poemsMap]);

  useEffect(() => {
    const fetchPoetry = async () => {
      try {
        const feedUrl = 'https://medium.com/feed/@RiversOfThought';
        const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

        const response = await fetch(proxyUrl);
        const data = await response.json();

        if (data.status === 'ok' && data.items) {
          const formattedPoems = data.items.map((item: RSSItem) => {
            const content = item.content || item.description || '';
            const cleanLink = item.link.split('?')[0];
            const slug = generateSlug(cleanLink);
            return {
              id: slug,
              title: item.title,
              preview: extractPreview(content),
              fullContent: extractFullContent(content),
              pubDate: formatDate(item.pubDate),
              link: cleanLink,
              thumbnail: item.thumbnail || extractImage(content),
              imageCaption: extractFigcaption(content)
            };
          });
          setPoems(formattedPoems);

          // Build slug -> index map for O(1) lookups
          const slugMap = new Map<string, number>();
          formattedPoems.forEach((poem: Poem, index: number) => {
            slugMap.set(generateSlug(poem.link), index);
          });
          setPoemsMap(slugMap);
        } else {
          setError('Failed to load poems');
        }
      } catch (err) {
        console.error('Error fetching poetry:', err);
        setError('Unable to load poems at this time');
      } finally {
        setLoading(false);
      }
    };

    fetchPoetry();
  }, []);

  const extractImage = (html: string): string | null => {
    const figureMatch = html.match(/<figure[^>]*>[\s\S]*?<img[^>]+src=["']([^"']+)["']/i);
    if (figureMatch && figureMatch[1]) {
      return figureMatch[1];
    }

    const cdnMatch = html.match(/src=["'](https:\/\/cdn-images-1\.medium\.com[^"']+)["']/i);
    if (cdnMatch && cdnMatch[1]) {
      return cdnMatch[1];
    }

    return null;
  };

  const extractFigcaption = (html: string): string | null => {
    const figcaptionMatch = html.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i);
    if (figcaptionMatch && figcaptionMatch[1]) {
      // Clean up the caption - remove HTML tags and decode entities
      const temp = document.createElement('div');
      temp.innerHTML = figcaptionMatch[1];
      return temp.textContent?.trim() || null;
    }
    return null;
  };

  const cleanContent = (html: string): string => {
    const temp = document.createElement('div');
    temp.innerHTML = html;

    temp.querySelectorAll('img').forEach(img => img.remove());

    temp.querySelectorAll('figure').forEach(fig => fig.remove());

    temp.querySelectorAll('figcaption').forEach(cap => cap.remove());

    let text = temp.textContent || temp.innerText || '';

    text = text
      .replace(/\b[\w-]+\.(png|jpg|jpeg|gif|svg|webp)\b/gi, '')
      .replace(/https?:\/\/[^\s]+\.(png|jpg|jpeg|gif|svg|webp)[^\s]*/gi, '')
      .replace(/https?:\/\/cdn-images[^\s]*/gi, '')
      .replace(/https?:\/\/miro\.medium\.com[^\s]*/gi, '')
      .replace(/Photo by[^.]*\./gi, '')
      .replace(/\d+\*[a-zA-Z0-9_-]+/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    return text;
  };

  const extractFullContent = (html: string): string => {
    let mainContent = html.split(/<hr/i)[0];

    mainContent = mainContent
      .replace(/<a[^>]*>.*?<\/a>/gi, '')
      .replace(/<img[^>]*>/gi, '')
      .replace(/<figure[^>]*>.*?<\/figure>/gi, '');

    const decodeEntities = (text: string): string => {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = text;
      return textarea.value;
    };

    const temp = document.createElement('div');
    temp.innerHTML = mainContent;

    temp.querySelectorAll('img, figure, figcaption').forEach(el => el.remove());

    const stanzas: string[] = [];
    temp.querySelectorAll('p, blockquote').forEach(el => {
      const elHtml = el.innerHTML
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '');

      const stanzaText = decodeEntities(elHtml).trim();
      if (stanzaText) {
        stanzas.push(stanzaText);
      }
    });

    let text = stanzas.join('\n\n');

    if (!text.trim()) {
      text = cleanContent(html);
    }

    text = text
      .replace(/\b[\w-]+\.(png|jpg|jpeg|gif|svg|webp)\b/gi, '')
      .replace(/\d+\*[a-zA-Z0-9_-]+/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return text;
  };

  const extractPreview = (html: string): string => {
    const fullText = extractFullContent(html);
    const lines = fullText.split('\n').filter(line => line.trim());
    // Skip "A poem" if it's the first line
    if (lines.length > 0 && lines[0].toLowerCase() === 'a poem') {
      return lines[1] || '';
    }
    return lines[0] || '';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="poetry" className="poetry">
      <div className="poetry-container">
        <div className="poetry-header">
          <span className="poetry-eyebrow">Rivers of Thought</span>
          <h2 className="poetry-title">Poetry</h2>
          <p className="poetry-subtitle">
            Words that flow from the heart, capturing moments of reflection and emotion
          </p>
        </div>

        {loading && (
          <div className="poetry-loading">
            <div className="loading-spinner"></div>
            <p>Loading poems...</p>
          </div>
        )}

        {error && (
          <div className="poetry-error">
            <p>{error}</p>
            <a
              href="https://medium.com/@RiversOfThought"
              target="_blank"
              rel="noopener noreferrer"
              className="poetry-link-btn"
            >
              Visit Medium Blog
            </a>
          </div>
        )}

        {!loading && !error && (
          <div className="poetry-grid">
            {poems.map((poem, index) => (
              <PoemCard
                key={poem.id}
                poem={poem}
                index={index}
                onReadMore={() => {
                  setSelectedPoemIndex(index);
                  updatePoemUrl(index);
                }}
              />
            ))}
          </div>
        )}

        <div className="poetry-cta">
          <a
            href="https://medium.com/@RiversOfThought"
            target="_blank"
            rel="noopener noreferrer"
            className="poetry-link-btn"
          >
            More on Medium
          </a>
        </div>
      </div>

      {selectedPoemIndex !== null && selectedPoemIndex <= poems.length && (selectedPoemIndex === poems.length || poems[selectedPoemIndex]) && (
        <PoemModal
          poem={selectedPoemIndex < poems.length ? poems[selectedPoemIndex] : poems[poems.length - 1]}
          onClose={() => {
            setSelectedPoemIndex(null);
            updatePoemUrl(null);
          }}
          onPrev={selectedPoemIndex > 0 ? () => {
            const newIndex = selectedPoemIndex - 1;
            setSelectedPoemIndex(newIndex);
            updatePoemUrl(newIndex);
          } : null}
          onNext={selectedPoemIndex < poems.length ? () => {
            const newIndex = selectedPoemIndex + 1;
            setSelectedPoemIndex(newIndex);
            if (newIndex < poems.length) {
              updatePoemUrl(newIndex);
            } else {
              updatePoemUrl(null); // CTA slide has no poem URL
            }
          } : null}
          currentIndex={selectedPoemIndex}
          totalCount={poems.length}
          isCtaSlide={selectedPoemIndex === poems.length}
        />
      )}
    </section>
  );
};

interface PoemCardProps {
  poem: Poem;
  index: number;
  onReadMore: () => void;
}

const PoemCard: React.FC<PoemCardProps> = ({ poem, index, onReadMore }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <article
      ref={cardRef}
      className={`poem-card ${isVisible ? 'poem-card-visible' : ''}`}
      onClick={onReadMore}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onReadMore()}
    >
      {poem.thumbnail && (
        <div className="poem-thumbnail">
          <img src={poem.thumbnail} alt={poem.title} />
        </div>
      )}
      <div className="poem-content">
        <time className="poem-date">{poem.pubDate}</time>
        <h3 className="poem-title">{poem.title}</h3>
        <p className="poem-excerpt">
          {poem.preview}
          <span className="poem-read-more-inline">... Read more</span>
        </p>
      </div>
    </article>
  );
};

interface PoemModalProps {
  poem: Poem;
  onClose: () => void;
  onPrev: (() => void) | null;
  onNext: (() => void) | null;
  currentIndex: number;
  totalCount: number;
  isCtaSlide: boolean;
}

const PoemModal: React.FC<PoemModalProps> = ({ poem, onClose, onPrev, onNext, currentIndex, totalCount, isCtaSlide }) => {
  const [displayPoem, setDisplayPoem] = useState<Poem>(poem);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevIndex = useRef<number>(currentIndex);

  // Detect navigation direction and trigger animation
  useEffect(() => {
    if (currentIndex !== prevIndex.current) {
      const direction = currentIndex > prevIndex.current ? 'left' : 'right';
      if (!swipeDirection) {
        setSwipeDirection(direction);
      }
      setIsAnimating(true);
      prevIndex.current = currentIndex;

      // Reset animation state after animation completes
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setSwipeDirection(null);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, swipeDirection]);

  // Update displayed poem
  useEffect(() => {
    if (poem !== displayPoem) {
      setDisplayPoem(poem);
    }
  }, [poem, displayPoem]);

  const handleSwipeDirectionChange = (direction: 'left' | 'right' | null) => {
    setSwipeDirection(direction);
  };

  // Footer center content with counter and Medium link
  const footerCenterContent = (
    <>
      {isCtaSlide ? (
        <span className="poem-modal-counter">{totalCount + 1} / {totalCount + 1}</span>
      ) : (
        <>
          {/* Mobile: counter links to Medium, Desktop: plain counter */}
          <a
            href={displayPoem?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="poem-modal-counter poem-modal-counter-mobile"
          >
            {currentIndex + 1} / {totalCount + 1}
          </a>
          <span className="poem-modal-counter poem-modal-counter-desktop">{currentIndex + 1} / {totalCount + 1}</span>
          {/* Desktop only: Medium link in footer */}
          <a
            href={displayPoem?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="poem-modal-link poem-modal-link-desktop"
          >
            View on Medium
          </a>
        </>
      )}
    </>
  );

  // Mobile close button in footer
  const footerExtraContent = (
    <button
      className="poem-modal-footer-close"
      onClick={onClose}
      aria-label="Close"
    >
      &times;
    </button>
  );

  // On CTA slide, replace next button with "Read more on Medium" link
  const nextButtonOverride = isCtaSlide ? (
    <a
      href="https://medium.com/@RiversOfThought"
      target="_blank"
      rel="noopener noreferrer"
      className="poem-modal-footer-cta-btn"
    >
      Read more on Medium
    </a>
  ) : undefined;

  return (
    <ModalComponent
      isOpen={true}
      onClose={onClose}
      onPrev={onPrev}
      onNext={onNext}
      currentIndex={currentIndex}
      totalCount={totalCount + 1}
      config={{
        maxWidth: 'sm',
        variant: 'poem',
        showHeader: false,
        showSideNav: true,
        showNavPulse: true,
        showFooter: true,
        decorativeNav: true,
      }}
      footerCenterContent={footerCenterContent}
      footerExtraContent={footerExtraContent}
      nextButtonOverride={nextButtonOverride}
      onSwipeDirectionChange={handleSwipeDirectionChange}
      contentClassName={`${isCtaSlide ? 'poem-modal-cta-slide' : ''} ${isAnimating ? `swipe-${swipeDirection}` : ''}`}
    >
      {/* Mobile header with Medium link - only for poem slides */}
      {!isCtaSlide && (
        <div className="poem-modal-header-mobile">
          <a
            href={displayPoem?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="poem-modal-link-mobile"
          >
            View on Medium
          </a>
        </div>
      )}

      {/* Sticky header with title and close button */}
      <div
        className={`poem-modal-sticky-header ${isCtaSlide ? 'poem-modal-sticky-header--cta' : ''}`}
        style={!isCtaSlide && displayPoem?.thumbnail ? { '--header-bg-image': `url(${displayPoem.thumbnail})` } as React.CSSProperties : undefined}
      >
        {!isCtaSlide && (
          <>
            <div className="poem-modal-header-date" title={displayPoem?.pubDate}>
              <svg className="poem-modal-calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span className="poem-modal-header-date-text">
                {displayPoem?.pubDate ? new Date(displayPoem.pubDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}
              </span>
            </div>
            <h3 className="poem-modal-sticky-title">{displayPoem?.title}</h3>
          </>
        )}
        {isCtaSlide && <span></span>}
        <button
          className="poem-modal-sticky-close"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      {isCtaSlide ? (
        /* CTA Slide */
        <div className="poem-modal-cta-content">
          <h2 className="poem-modal-cta-title">Thank you for reading</h2>
          <p className="poem-modal-cta-subtitle">
            I've written more poems from the heart — each one a piece of my soul poured onto the page. I'd love for you to explore them on Medium.
          </p>
          <span className="poem-modal-signature">~ Abishek</span>
        </div>
      ) : (
        /* Poem Content */
        <>
          {displayPoem?.thumbnail && (
            <figure className="poem-modal-figure">
              <div className="poem-modal-image">
                <img src={displayPoem.thumbnail} alt={displayPoem.title} />
              </div>
              {displayPoem.imageCaption && (
                <figcaption className="poem-modal-caption">{displayPoem.imageCaption}</figcaption>
              )}
            </figure>
          )}
          <div className="poem-modal-text">
            {(() => {
              if (!displayPoem) return null;

              // Remove "A poem" if it's the first line (common for all poems)
              let content = displayPoem.fullContent;
              const firstLine = content.split('\n').find(line => line.trim());
              if (firstLine && firstLine.trim().toLowerCase() === 'a poem') {
                content = content.replace(/^\s*a poem\s*\n/i, '');
              }

              // Poems that need 4-line stanza breaks (matched by exact ID)
              const fourLineStanzaPoems = [
                'literally-literary__painful-farewell-595711fbcf36',
                'literally-literary__kashmir-be613d9df0d8'
              ];
              const needsFourLineBreaks = fourLineStanzaPoems.includes(displayPoem.id);

              if (needsFourLineBreaks) {
                const allLines = content.split('\n').filter(line => line.trim());
                const stanzas: string[][] = [];
                for (let i = 0; i < allLines.length; i += 4) {
                  stanzas.push(allLines.slice(i, i + 4));
                }
                return stanzas.map((stanza, stanzaIdx) => (
                  <div key={stanzaIdx} className="poem-stanza">
                    {stanza.map((line, lineIdx) => (
                      <span key={lineIdx} className="poem-line">{line}</span>
                    ))}
                  </div>
                ));
              }

              return content.split('\n\n').map((stanza, stanzaIdx) => (
                <div key={stanzaIdx} className="poem-stanza">
                  {stanza.split('\n').map((line, lineIdx) => (
                    <span key={lineIdx} className="poem-line">{line}</span>
                  ))}
                </div>
              ));
            })()}
          </div>
        </>
      )}
    </ModalComponent>
  );
};

export default Poetry;
