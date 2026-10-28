import type { CategoriesService } from '@/api/types';
import { categories } from '@/data/sample';
import { delay } from '@/utils/helpers';
export const categoriesMock: CategoriesService = {
  async list() {
    await delay();
    return categories;
  },
};
