import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import './styles/variables.css';
import './styles/global.css';
import './styles/header.css';
import './styles/index.css';
import './styles/auth.css';
import './styles/forms.css';
import './styles/userSidebar.css';
import './styles/modals.css';
import './styles/dashboard.css';
import './styles/themeToggle.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);