import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import { store } from '@/redux/store';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { CatalogProvider } from '@/context/CatalogContext';
import { PwaUpdater } from '@/components/layout/PwaUpdater';
import './i18n';
import './index.css';
import App from './App';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <LanguageProvider>
          <ThemeProvider>
            <MotionConfig reducedMotion="user">
              <CatalogProvider>
                <BrowserRouter>
                  <App />
                  <PwaUpdater />
                </BrowserRouter>
              </CatalogProvider>
            </MotionConfig>
          </ThemeProvider>
        </LanguageProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
);
