import { useState, useEffect, useCallback } from 'react';

const useScrollSpy = (sections = [], options = {}) => {
  const { navbarHeight = 80, sectionOffset = 100 } = options;
  const [activeSection, setActiveSection] = useState('home');

  const getActiveSection = useCallback((scrollY) => {
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
