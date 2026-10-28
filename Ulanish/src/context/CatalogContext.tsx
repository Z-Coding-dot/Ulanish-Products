import { createContext, useContext, type ReactNode } from 'react';
import { useCompanies, useCategories } from '@/hooks/useCatalog';
import type { Company, Category } from '@/api/types';
const Context = createContext({
  companies: [] as Company[],
  categories: [] as Category[],
  loading: true,
  error: false,
  retry: () => {},
});
export function CatalogProvider({ children }: { children: ReactNode }) {
  const c = useCompanies();
  const k = useCategories();
  return (
    <Context.Provider
      value={{
        companies: c.data ?? [],
        categories: k.data ?? [],
        loading: c.loading || k.loading,
        error: c.error || k.error,
        retry: () => {
          c.retry();
          k.retry();
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useCatalogMetadata = () => useContext(Context);
