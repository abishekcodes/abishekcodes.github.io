'use client';

import React, { useEffect, useRef, MouseEvent, TouchEvent, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '@/styles/UI/modal-component.css';

export interface ModalConfig {
  /** Modal width variant */
  maxWidth?: 'sm' | 'md' | 'lg' | string;
  /** Styling variant for themed modals */
  variant?: 'default' | 'project' | 'poem';
  /** Whether to show the header section */
  showHeader?: boolean;
  /** Whether to show navigation arrows on sides (desktop) */
  showSideNav?: boolean;
  /** Whether to show pulsing glow effect on nav buttons */
  showNavPulse?: boolean;
  /** Whether to show footer navigation */
  showFooter?: boolean;
  /** Custom class for the backdrop */
  backdropClassName?: string;
  /** Custom class for the modal container */
  modalClassName?: string;
  /** Custom class for the modal body/content */
  bodyClassName?: string;
  /** Whether side nav uses decorative styling (poem style) */
  decorativeNav?: boolean;
}

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  onPrev: (() => void) | null;
  onNext: (() => void) | null;
  currentIndex: number;
  totalCount: number;
  config?: ModalConfig;
  /** Custom header content - if provided, showHeader should be true */
  headerContent?: ReactNode;
  /** Main modal body content */
  children: ReactNode;
  /** Custom footer center content (between nav buttons) */
  footerCenterContent?: ReactNode;
  /** Additional footer content (e.g., mobile close button) */
  footerExtraContent?: ReactNode;
  /** Custom content to replace the next button (e.g., CTA link on last slide) */
  nextButtonOverride?: ReactNode;
  /** Callback when swipe direction changes (for animations) */
  onSwipeDirectionChange?: (direction: 'left' | 'right' | null) => void;
  /** Additional class for content wrapper (for animation states) */
  contentClassName?: string;
}

const defaultConfig: ModalConfig = {
  maxWidth: 'md',
  variant: 'default',
  showHeader: true,
  showSideNav: true,
  showNavPulse: false,
  showFooter: true,
  decorativeNav: false,
};

const getMaxWidthStyle = (maxWidth: string | undefined): string => {
  switch (maxWidth) {
    case 'sm':
      return '520px';
    case 'md':
      return '700px';
    case 'lg':
      return '900px';
    default:
      return maxWidth || '700px';
  }
};

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCount,
  config = {},
  headerContent,
  children,
  footerCenterContent,
  footerExtraContent,
  nextButtonOverride,
  onSwipeDirectionChange,
  contentClassName,
}) => {
  const mergedConfig = { ...defaultConfig, ...config };
  const {
    maxWidth,
    variant,
    showHeader,
    showSideNav,
    showNavPulse,
    showFooter,
    backdropClassName,
    modalClassName,
    bodyClassName,
    decorativeNav,
  } = mergedConfig;

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (modalBodyRef.current) {
          modalBodyRef.current.scrollBy({ top: 100, behavior: 'smooth' });
        }
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (modalBodyRef.current) {
          modalBodyRef.current.scrollBy({ top: -100, behavior: 'smooth' });
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  // Scroll to top when content changes
  useEffect(() => {
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0;
    }
  }, [currentIndex]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0 && onPrev) {
        onSwipeDirectionChange?.('right');
        onPrev();
      } else if (deltaX < 0 && onNext) {
        onSwipeDirectionChange?.('left');
        onNext();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const backdropClass = `modal-component-backdrop modal-component-backdrop--${variant} ${backdropClassName || ''}`.trim();
  const containerClass = `modal-component modal-component--${variant} ${modalClassName || ''}`.trim();
  const bodyClass = `modal-component-body modal-component-body--${variant} ${bodyClassName || ''}`.trim();

  const renderNavIcon = (direction: 'prev' | 'next') => {
    if (decorativeNav) {
      return (
        <>
          <span className="nav-icon">{direction === 'prev' ? '‹' : '›'}</span>
          {showNavPulse && <span className="nav-pulse"></span>}
        </>
      );
    }
    return <FontAwesomeIcon icon={direction === 'prev' ? faChevronLeft : faChevronRight} />;
  };

  return (
    <div className={backdropClass} onClick={handleBackdropClick}>
      {/* Side navigation - Previous */}
      {showSideNav && onPrev && (
        <button
          className={`modal-component-nav modal-component-nav--prev modal-component-nav--${variant} ${decorativeNav ? 'modal-component-nav--decorative' : ''}`}
          onClick={onPrev}
          aria-label="Previous"
        >
          {renderNavIcon('prev')}
        </button>
      )}

      <div
        className={containerClass}
        style={{ maxWidth: getMaxWidthStyle(maxWidth) }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header */}
        {showHeader && headerContent && (
          <div className={`modal-component-header modal-component-header--${variant}`}>
            {headerContent}
            <button
              className="modal-component-close"
              onClick={onClose}
              aria-label="Close modal"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        )}

        {/* Close button for modals without header */}
        {!showHeader && (
          <button
            className={`modal-component-close modal-component-close--floating modal-component-close--${variant}`}
            onClick={onClose}
            aria-label="Close"
          >
            <span>&times;</span>
          </button>
        )}

        {/* Body */}
        <div
          className={`${bodyClass} ${contentClassName || ''}`}
          ref={modalBodyRef}
        >
          {children}

          {/* Footer */}
          {showFooter && (
            <div className={`modal-component-footer modal-component-footer--${variant}`}>
              <button
                className="modal-component-footer-nav"
                onClick={onPrev || undefined}
                disabled={!onPrev}
                aria-label="Previous"
              >
                {decorativeNav ? '‹' : <FontAwesomeIcon icon={faChevronLeft} />}
              </button>

              <div className="modal-component-footer-center">
                {footerCenterContent || (
                  <span className="modal-component-counter">
                    {currentIndex + 1} / {totalCount}
                  </span>
                )}
              </div>

              {nextButtonOverride || (
                <button
                  className="modal-component-footer-nav"
                  onClick={onNext || undefined}
                  disabled={!onNext}
                  aria-label="Next"
                >
                  {decorativeNav ? '›' : <FontAwesomeIcon icon={faChevronRight} />}
                </button>
              )}

              {footerExtraContent}
            </div>
          )}
        </div>
      </div>

      {/* Side navigation - Next */}
      {showSideNav && onNext && (
        <button
          className={`modal-component-nav modal-component-nav--next modal-component-nav--${variant} ${decorativeNav ? 'modal-component-nav--decorative' : ''}`}
          onClick={onNext}
          aria-label="Next"
        >
          {renderNavIcon('next')}
        </button>
      )}

      {/* Side navigation - Next Button Override (e.g., "Continue to Articles" on last item) */}
      {showSideNav && !onNext && nextButtonOverride && (
        <div className={`modal-component-nav-override modal-component-nav-override--next modal-component-nav-override--${variant}`}>
          {nextButtonOverride}
        </div>
      )}
    </div>
  );
};

export default ModalComponent;
