import { useState, useEffect, useCallback } from 'react';

interface ScrollSpyOptions {
  navbarHeight?: number;
  sectionOffset?: number;
}

interface ScrollSpyResult {
  activeSection: string;
}

const useScrollSpy = (sections: string[] = [], options: ScrollSpyOptions = {}): ScrollSpyResult => {
  const { navbarHeight = 80, sectionOffset = 100 } = options;
  const [activeSection, setActiveSection] = useState('home');

  const getActiveSection = useCallback((scrollY: number): string => {
    const adjustedScrollPosition = scrollY + navbarHeight + sectionOffset;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (!element) continue;

      const { offsetTop, offsetHeight } = element;
      if (adjustedScrollPosition >= offsetTop && adjustedScrollPosition < offsetTop + offsetHeight) {
        return section;
      }
    }

    return sections[0] || 'home';
  }, [sections, navbarHeight, sectionOffset]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newActiveSection = getActiveSection(scrollY);

      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [getActiveSection, activeSection]);

  return { activeSection };
};

export default useScrollSpy;
