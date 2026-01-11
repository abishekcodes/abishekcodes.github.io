import React, { createContext, useContext, useState } from 'react';

const PageModeContext = createContext();

export const PageModeProvider = ({ children }) => {
  const [mode, setMode] = useState('professional');

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
