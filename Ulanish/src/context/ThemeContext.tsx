import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { siteConfig } from '@/data/siteConfig';
const ThemeContext = createContext(siteConfig.colors);
export const useTheme = () => useContext(ThemeContext);
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    for (const [name, value] of Object.entries(siteConfig.colors))
      document.documentElement.style.setProperty(`--${name}`, value);
  }, []);
  return <ThemeContext.Provider value={siteConfig.colors}>{children}</ThemeContext.Provider>;
}
