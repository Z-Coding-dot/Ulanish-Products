import { useEffect, useRef, useState } from 'react';
export function useAsync<T>(loader: () => Promise<T>, key: string) {
  const loaderRef = useRef(loader);
  loaderRef.current = loader;
  const [revision, setRevision] = useState(0);
  const [state, set] = useState<{ data: T | undefined; loading: boolean; error: boolean }>({
    data: undefined,
    loading: true,
    error: false,
  });
  useEffect(() => {
    let active = true;
    set({ data: undefined, loading: true, error: false });
    loaderRef
      .current()
      .then((data) => {
        if (active) set({ data, loading: false, error: false });
      })
      .catch(() => {
        if (active) set({ data: undefined, loading: false, error: true });
      });
    return () => {
      active = false;
    };
  }, [key, revision]);
  return { ...state, retry: () => setRevision((x) => x + 1) };
}
