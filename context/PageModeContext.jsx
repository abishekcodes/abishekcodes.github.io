'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const PageModeContext = createContext();

const STORAGE_KEY = 'pageMode';

export const PageModeProvider = ({ children }) => {
  const [mode, setMode] = useState('professional');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from URL params and localStorage on client
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const kindParam = urlParams.get('kind');

    let initialMode = 'professional';

    if (kindParam === 'poetry' || kindParam === 'personal') {
      initialMode = 'personal';
    } else if (kindParam === 'professional' || kindParam === 'pro') {
      initialMode = 'professional';
    } else {
      // Fall back to localStorage
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'personal') {
        initialMode = 'personal';
      }
    }

    setMode(initialMode);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    localStorage.setItem(STORAGE_KEY, mode);

    // Update URL query param
    const url = new URL(window.location);
    url.searchParams.set('kind', mode === 'personal' ? 'poetry' : 'pro');
    window.history.replaceState({}, '', url);
  }, [mode, isInitialized]);

  const toggleMode = () => {
    const goingToPersonal = mode === 'professional';
    setMode(prev => prev === 'professional' ? 'personal' : 'professional');

    if (goingToPersonal) {
      // Small delay needed when switching to personal/poetry mode
      setTimeout(() => window.scrollTo(0, 0), 10);
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <PageModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </PageModeContext.Provider>
  );
};

export const usePageMode = () => {
  const context = useContext(PageModeContext);
  if (!context) {
    throw new Error('usePageMode must be used within a PageModeProvider');
  }
  return context;
};
