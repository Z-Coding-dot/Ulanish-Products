import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
const positions = new Map<string, number>();
export function ScrollToTop() {
 const location = useLocation();
 const type = useNavigationType();
 const previousPath = useRef<string | null>(null);
 useEffect(() => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const changed = previousPath.current !== location.pathname;
  const initial = previousPath.current === null;
  previousPath.current = location.pathname;
  const restore = type === 'POP';
  const target = restore ? positions.get(location.key) ?? 0 : 0;
  const apply = () => window.scrollTo({ top: target, behavior: 'instant' as ScrollBehavior });
  if (changed || restore) apply();
  const timer = restore ? window.setTimeout(apply, 400) : undefined;
  if (changed && !initial) document.getElementById('main-content')?.focus({ preventScroll: true });
  const save = () => positions.set(location.key, window.scrollY);
  save();
  window.addEventListener('scroll', save, { passive: true });
  return () => { clearTimeout(timer); window.removeEventListener('scroll', save); };
 }, [location.key, location.pathname, type]);
 return null;
}
