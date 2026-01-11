import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';

import './styles/Layout/footer.css';
import './styles/Layout/navigation.css';

import './styles/Sections/hero.css';
import './styles/Sections/skills.css';
import './styles/Sections/experience.css';
import './styles/Sections/projects.css';

import './styles/UI/button.css';

import './styles/accessibility.css';
import './styles/responsive.css';
import './styles/utilities.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
