'use client';

import dynamic from 'next/dynamic';
import { PageModeProvider, usePageMode } from '@/context/PageModeContext';
import BackgroundAnimation from '@/components/Layout/BackgroundAnimation';
import Navigation from '@/components/Layout/Navigation';
import Hero from '@/components/Sections/Hero';
import PersonalHero from '@/components/Sections/PersonalHero';
import Footer from '@/components/Layout/Footer';
import useScrollSpy from '@/hooks/useScrollSpy';

// Lazy load below-fold sections to reduce initial bundle size
const Skills = dynamic(() => import('@/components/Sections/Skills'));
const Experience = dynamic(() => import('@/components/Sections/Experience'));
const Projects = dynamic(() => import('@/components/Sections/Projects'));
const About = dynamic(() => import('@/components/Sections/About'));
const Articles = dynamic(() => import('@/components/Sections/Articles'));
const Poetry = dynamic(() => import('@/components/Sections/Poetry'));

const AppContent = () => {
  const { mode } = usePageMode();

  const professionalSections = ['home', 'skills', 'experience', 'projects', 'articles', 'about', 'contact'];
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
            <Articles />
            <About />
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
