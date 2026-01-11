import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Sections/poetry.css';

const Poetry = () => {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPoemIndex, setSelectedPoemIndex] = useState(null);

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
              thumbnail: item.thumbnail || extractImage(content)
            };
          });
          setPoems(formattedPoems);
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
                onReadMore={() => setSelectedPoemIndex(index)}
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
          onClose={() => setSelectedPoemIndex(null)}
          onPrev={selectedPoemIndex > 0 ? () => setSelectedPoemIndex(selectedPoemIndex - 1) : null}
          onNext={selectedPoemIndex < poems.length - 1 ? () => setSelectedPoemIndex(selectedPoemIndex + 1) : null}
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
          <button onClick={onReadMore} className="poem-read-more-inline">... Read more</button>
        </p>
      </div>
    </article>
  );
};

const PoemModal = ({ poem, onClose, onPrev, onNext, currentIndex, totalCount }) => {
  const modalContentRef = useRef(null);

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

  // Scroll to top when poem changes
  useEffect(() => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTop = 0;
    }
  }, [poem]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="poem-modal-overlay" onClick={handleBackdropClick}>
      {onPrev && (
        <button className="poem-modal-nav poem-modal-prev" onClick={onPrev} aria-label="Previous poem">
          <span>&#8249;</span>
        </button>
      )}

      <div className="poem-modal">
        <button className="poem-modal-close" onClick={onClose} aria-label="Close">
          <span>&times;</span>
        </button>
        <div className="poem-modal-content" ref={modalContentRef}>
          {poem.thumbnail && (
            <div className="poem-modal-image">
              <img src={poem.thumbnail} alt={poem.title} />
            </div>
          )}
          <time className="poem-modal-date">{poem.pubDate}</time>
          <h2 className="poem-modal-title">{poem.title}</h2>
          <div className="poem-modal-text">
            {(() => {
              const isPainfulFarewell = poem.title.toLowerCase().includes('painful farewell');

              if (isPainfulFarewell) {
                const allLines = poem.fullContent.split('\n').filter(line => line.trim());
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

              return poem.fullContent.split('\n\n').map((stanza, stanzaIdx) => (
                <div key={stanzaIdx} className="poem-stanza">
                  {stanza.split('\n').map((line, lineIdx) => (
                    <span key={lineIdx} className="poem-line">{line}</span>
                  ))}
                </div>
              ));
            })()}
          </div>
          <div className="poem-modal-footer">
            <span className="poem-modal-counter">{currentIndex + 1} / {totalCount}</span>
            <a
              href={poem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="poem-modal-link"
            >
              View on Medium
            </a>
          </div>
        </div>
      </div>

      {onNext && (
        <button className="poem-modal-nav poem-modal-next" onClick={onNext} aria-label="Next poem">
          <span>&#8250;</span>
        </button>
      )}
    </div>
  );
};

export default Poetry;
