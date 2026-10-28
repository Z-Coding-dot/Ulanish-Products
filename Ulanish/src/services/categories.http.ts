import { categorySchema, type CategoriesService } from '@/api/types';
import { getValidated } from '@/api/client';
import { endpoints } from '@/api/endpoints';
export const categoriesHttp: CategoriesService = {
  list: () => getValidated(endpoints.categories, categorySchema.array()),
};
