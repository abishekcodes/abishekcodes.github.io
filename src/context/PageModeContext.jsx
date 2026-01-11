import React, { createContext, useContext, useState, useEffect } from 'react';

const PageModeContext = createContext();

const STORAGE_KEY = 'pageMode';

export const PageModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'personal' ? 'personal' : 'professional';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(prev => prev === 'professional' ? 'personal' : 'professional');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
