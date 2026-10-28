import { useState, useEffect } from 'react';
export function useDebounce<T>(value: T, ms = 300) {
  const [debounced, set] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => set(value), ms);
    return () => clearTimeout(timer);
  }, [value, ms]);
  return debounced;
}
