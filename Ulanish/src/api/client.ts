import axios from 'axios';
import type { ZodType } from 'zod';
export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
  ) {
    super(code);
    this.name = 'ApiError';
  }
}
export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { Accept: 'application/json' },
});
const cache = new Map<string, { expires: number; value: unknown }>();
export async function getValidated<T>(
  path: string,
  schema: ZodType<T>,
  params?: object,
): Promise<T> {
  const key = JSON.stringify([path, params]);
  const hit = cache.get(key);
  if (hit && hit.expires > Date.now()) return hit.value as T;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await client.get<unknown>(path, { params });
      const value = schema.parse(response.data);
      cache.set(key, { value, expires: Date.now() + 60000 });
      return value;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 0;
        if (attempt === 0 && (status === 0 || status >= 500)) {
          await new Promise((r) => setTimeout(r, 250));
          continue;
        }
        throw new ApiError(status, status === 404 ? 'notFound' : 'network');
      }
      throw new ApiError(0, 'invalidResponse');
    }
  }
  throw new ApiError(0, 'network');
}
