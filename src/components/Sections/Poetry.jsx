import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Sections/poetry.css';

const Poetry = () => {
  const [poems, setPoems] = useState([]);
  const [poemsMap, setPoemsMap] = useState(new Map()); // slug -> index
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPoemIndex, setSelectedPoemIndex] = useState(null);

  // Generate URL-friendly slug from Medium URL
  // Takes the path after medium.com and replaces / with __
  const generateSlug = (link) => {
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
  const updatePoemUrl = (index, poemsList = poems) => {
    const url = new URL(window.location);
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
        setSelectedPoemIndex(poemsMap.get(poemSlug));
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
          const formattedPoems = data.items.map((item, index) => {
            const content = item.content || item.description;
            const cleanLink = item.link.split('?')[0];
            return {
              id: index + 1,
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
          const slugMap = new Map();
          formattedPoems.forEach((poem, index) => {
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

  const extractImage = (html) => {
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

  const extractFigcaption = (html) => {
    const figcaptionMatch = html.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i);
    if (figcaptionMatch && figcaptionMatch[1]) {
      // Clean up the caption - remove HTML tags and decode entities
      const temp = document.createElement('div');
      temp.innerHTML = figcaptionMatch[1];
      return temp.textContent?.trim() || null;
    }
    return null;
  };

  const cleanContent = (html) => {
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

  const extractFullContent = (html) => {
    let mainContent = html.split(/<hr/i)[0];

    mainContent = mainContent
      .replace(/<a[^>]*>.*?<\/a>/gi, '')
      .replace(/<img[^>]*>/gi, '')
      .replace(/<figure[^>]*>.*?<\/figure>/gi, '');

    const decodeEntities = (text) => {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = text;
      return textarea.value;
    };

    const temp = document.createElement('div');
    temp.innerHTML = mainContent;

    temp.querySelectorAll('img, figure, figcaption').forEach(el => el.remove());

    const stanzas = [];
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

  const extractPreview = (html) => {
    const fullText = extractFullContent(html);
    const firstLine = fullText.split('\n')[0];
    return firstLine || '';
  };

  const formatDate = (dateString) => {
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

      {selectedPoemIndex !== null && (
        <PoemModal
          poem={poems[selectedPoemIndex]}
          onClose={() => {
            setSelectedPoemIndex(null);
            updatePoemUrl(null);
          }}
          onPrev={selectedPoemIndex > 0 ? () => {
            const newIndex = selectedPoemIndex - 1;
            setSelectedPoemIndex(newIndex);
            updatePoemUrl(newIndex);
          } : null}
          onNext={selectedPoemIndex < poems.length - 1 ? () => {
            const newIndex = selectedPoemIndex + 1;
            setSelectedPoemIndex(newIndex);
            updatePoemUrl(newIndex);
          } : null}
          currentIndex={selectedPoemIndex}
          totalCount={poems.length}
        />
      )}
    </section>
  );
};

const PoemCard = ({ poem, index, onReadMore }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

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

const PoemModal = ({ poem, onClose, onPrev, onNext, currentIndex, totalCount }) => {
  const modalContentRef = useRef(null);
  const [displayPoem, setDisplayPoem] = useState(poem);
  const [swipeDirection, setSwipeDirection] = useState(null); // 'left' or 'right'
  const [isAnimating, setIsAnimating] = useState(false);

  // Touch swipe support
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const prevIndex = useRef(currentIndex);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    // Only trigger if horizontal swipe is greater than vertical (not scrolling)
    // and swipe distance is significant (> 50px)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0 && onPrev) {
        // Swiped right -> go to previous
        setSwipeDirection('right');
        onPrev();
      } else if (deltaX < 0 && onNext) {
        // Swiped left -> go to next
        setSwipeDirection('left');
        onNext();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

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

  // Update displayed poem and scroll to top
  useEffect(() => {
    if (poem !== displayPoem) {
      setDisplayPoem(poem);
      if (modalContentRef.current) {
        modalContentRef.current.scrollTop = 0;
      }
    }
  }, [poem, displayPoem]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="poem-modal-overlay" onClick={handleBackdropClick}>
      {onPrev && (
        <button
          className="poem-modal-nav poem-modal-prev"
          onClick={onPrev}
          aria-label="Previous poem"
        >
          <span className="nav-icon">&#8249;</span>
          <span className="nav-pulse"></span>
        </button>
      )}

      <div
        className="poem-modal"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Desktop close button */}
        <button className="poem-modal-close poem-modal-close-desktop" onClick={onClose} aria-label="Close">
          <span>&times;</span>
        </button>
        {/* Mobile header with Medium link */}
        <div className="poem-modal-header-mobile">
          <a
            href={displayPoem.link}
            target="_blank"
            rel="noopener noreferrer"
            className="poem-modal-link-mobile"
          >
            View on Medium
          </a>
        </div>
        <div
          className={`poem-modal-content ${isAnimating ? `swipe-${swipeDirection}` : ''}`}
          ref={modalContentRef}
        >
          {displayPoem.thumbnail && (
            <figure className="poem-modal-figure">
              <div className="poem-modal-image">
                <img src={displayPoem.thumbnail} alt={displayPoem.title} />
              </div>
              {displayPoem.imageCaption && (
                <figcaption className="poem-modal-caption">{displayPoem.imageCaption}</figcaption>
              )}
            </figure>
          )}
          <time className="poem-modal-date">{displayPoem.pubDate}</time>
          <h2 className="poem-modal-title">{displayPoem.title}</h2>
          <div className="poem-modal-text">
            {(() => {
              const isPainfulFarewell = displayPoem.title.toLowerCase().includes('painful farewell');

              if (isPainfulFarewell) {
                const allLines = displayPoem.fullContent.split('\n').filter(line => line.trim());
                const stanzas = [];
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

              return displayPoem.fullContent.split('\n\n').map((stanza, stanzaIdx) => (
                <div key={stanzaIdx} className="poem-stanza">
                  {stanza.split('\n').map((line, lineIdx) => (
                    <span key={lineIdx} className="poem-line">{line}</span>
                  ))}
                </div>
              ));
            })()}
          </div>
          <div className="poem-modal-footer">
            <button
              className="poem-modal-footer-nav"
              onClick={onPrev}
              disabled={!onPrev}
              aria-label="Previous poem"
            >
              &#8249;
            </button>
            <div className="poem-modal-footer-center">
              {/* Mobile: counter links to Medium, Desktop: plain counter */}
              <a
                href={displayPoem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="poem-modal-counter poem-modal-counter-mobile"
              >
                {currentIndex + 1} / {totalCount}
              </a>
              <span className="poem-modal-counter poem-modal-counter-desktop">{currentIndex + 1} / {totalCount}</span>
              {/* Desktop only: Medium link in footer */}
              <a
                href={displayPoem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="poem-modal-link poem-modal-link-desktop"
              >
                View on Medium
              </a>
            </div>
            <button
              className="poem-modal-footer-nav"
              onClick={onNext}
              disabled={!onNext}
              aria-label="Next poem"
            >
              &#8250;
            </button>
            {/* Mobile only: Close button in footer */}
            <button
              className="poem-modal-footer-close"
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      </div>

      {onNext && (
        <button
          className="poem-modal-nav poem-modal-next"
          onClick={onNext}
          aria-label="Next poem"
        >
          <span className="nav-icon">&#8250;</span>
          <span className="nav-pulse"></span>
        </button>
      )}
    </div>
  );
};

export default Poetry;
