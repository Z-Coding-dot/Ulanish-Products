import { z } from 'zod';
export const languages = ['en', 'fa-AF', 'ps'] as const;
export type Language = (typeof languages)[number];
export const localizedSchema = z.object({ en: z.string(), 'fa-AF': z.string(), ps: z.string() });
export type L = z.infer<typeof localizedSchema>;
export const companySchema = z.object({
  id: z.string(),
  name: localizedSchema,
  description: localizedSchema,
  monogram: z.string(),
});
export const categorySchema = z.object({
  id: z.string(),
  name: localizedSchema,
  image: z.string(),
});
export const productSchema = z.object({
  id: z.number().int(),
  code: z.string(),
  name: localizedSchema,
  companyId: z.string(),
  categoryId: z.string(),
  price: z.number().int().nonnegative(),
  stock: z.enum(['in', 'out']),
  quantity: z.number().int().optional(),
  images: z.array(z.string()),
  specs: z.array(z.object({ label: localizedSchema, value: localizedSchema })),
  description: localizedSchema,
  createdAt: z.string(),
});
export type Product = z.infer<typeof productSchema>;
export type Company = z.infer<typeof companySchema>;
export type Category = z.infer<typeof categorySchema>;
export const productPageSchema = z.object({
  items: z.array(productSchema),
  total: z.number().int(),
  page: z.number().int(),
  pageSize: z.number().int(),
});
export type ProductPage = z.infer<typeof productPageSchema>;
export interface ProductFilters {
  q?: string;
  company?: string;
  category?: string;
  min?: number;
  max?: number;
  inStock?: boolean;
  sort?: 'newest' | 'price-asc' | 'price-desc';
  page?: number;
  pageSize?: number;
}
export const settingsSchema = z.object({
  announcement: localizedSchema,
  catalogEnabled: z.boolean(),
});
export type Settings = z.infer<typeof settingsSchema>;
export interface ProductsService {
  list(filters?: ProductFilters): Promise<ProductPage>;
  get(id: number): Promise<Product | null>;
}
export interface CompaniesService {
  list(): Promise<Company[]>;
}
export interface CategoriesService {
  list(): Promise<Category[]>;
}
export interface SearchService {
  search(q: string, filters?: ProductFilters): Promise<ProductPage>;
}
export interface SettingsService {
  get(): Promise<Settings>;
}
