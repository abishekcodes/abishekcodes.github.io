'use client';

import { PageModeProvider, usePageMode } from '@/context/PageModeContext';
import BackgroundAnimation from '@/components/Layout/BackgroundAnimation';
import Navigation from '@/components/Layout/Navigation';
import Hero from '@/components/Sections/Hero';
import PersonalHero from '@/components/Sections/PersonalHero';
import Skills from '@/components/Sections/Skills';
import Experience from '@/components/Sections/Experience';
import Projects from '@/components/Sections/Projects';
import Poetry from '@/components/Sections/Poetry';
import Footer from '@/components/Layout/Footer';
import useScrollSpy from '@/hooks/useScrollSpy';

const AppContent = () => {
  const { mode } = usePageMode();

  const professionalSections = ['home', 'skills', 'experience', 'projects', 'contact'];
  const personalSections = ['home', 'poetry', 'contact'];

  const sections = mode === 'professional' ? professionalSections : personalSections;
  const { activeSection } = useScrollSpy(sections);

  return (
    <div className="App">
      <BackgroundAnimation />
      <Navigation activeSection={activeSection} />
      <main>
        {mode === 'professional' ? (
          <>
            <Hero />
            <Skills />
            <Experience />
            <Projects />
          </>
        ) : (
          <>
            <PersonalHero />
            <Poetry />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default function Home() {
  return (
    <PageModeProvider>
      <AppContent />
    </PageModeProvider>
  );
}
