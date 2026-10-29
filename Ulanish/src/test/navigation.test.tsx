import { afterEach, describe, it, expect } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import i18n from '@/i18n';
import { store } from '@/redux/store';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { CatalogProvider } from '@/context/CatalogContext';
import { navigation, legalNavigation } from '@/data/navigation';
import App from '@/App';
afterEach(cleanup);
function mount(path: string) {
  return render(
    <HelmetProvider>
      <Provider store={store}>
        <LanguageProvider>
          <ThemeProvider>
            <MotionConfig reducedMotion="always">
              <CatalogProvider>
                <MemoryRouter
                  initialEntries={[path]}
                  future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
                >
                  <App />
                </MemoryRouter>
              </CatalogProvider>
            </MotionConfig>
          </ThemeProvider>
        </LanguageProvider>
      </Provider>
    </HelmetProvider>,
  );
}
describe('navigation integrity', () => {
  it('renders every nav route with a unique title and H1 and correct active links', async () => {
    await i18n.changeLanguage('en');
    const titles = new Set<string>(),
      headings = new Set<string>();
    for (const nav of [...navigation, ...legalNavigation]) {
      mount(nav.to);
      // Lazy route imports can exceed the default one-second wait on a cold run.
      await waitFor(() => expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1), {
        timeout: 5000,
      });
      const heading = screen.getByRole('heading', { level: 1 }).textContent!;
      await waitFor(() => expect(document.title).toContain(heading));
      expect(headings.has(heading)).toBe(false);
      expect(titles.has(document.title)).toBe(false);
      headings.add(heading);
      titles.add(document.title);
      const active = Array.from(document.querySelectorAll('a[aria-current="page"]'));
      if (navigation.some((n) => n.to === nav.to)) {
        expect(active.length).toBe(2);
        for (const link of active) expect(link.getAttribute('href')).toBe(nav.to);
      } else expect(active).toHaveLength(0);
      cleanup();
    }
    expect(headings.size).toBe(7);
  }, 20000);
  it('renders product details, search, offline and unknown routes', async () => {
    for (const path of ['/products/115', '/search?q=sona', '/offline', '/missing']) {
      mount(path);
      await waitFor(() => expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1));
      cleanup();
    }
  }, 15000);
  it('sets the document language and direction for Pashto', async () => {
    await i18n.changeLanguage('ps');
    mount('/contact');
    await screen.findByRole('heading', { level: 1 });
    expect(document.documentElement.lang).toBe('ps');
    expect(document.documentElement.dir).toBe('rtl');
  });
});
