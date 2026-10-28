import type { L, Language } from '@/api/types';
export const localized = (value: L, language: string): string =>
  value[language as Language] ?? value.en;
export const delay = (ms = 220) =>
  new Promise<void>((resolve) => setTimeout(resolve, import.meta.env.MODE === 'test' ? 0 : ms));
export function readStorage<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback;
  } catch {
    return fallback;
  }
}
export function writeStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Storage may be unavailable in private browsing. */
  }
}
