import { productPageSchema, productSchema, type ProductsService } from '@/api/types';
import { ApiError, getValidated } from '@/api/client';
import { endpoints } from '@/api/endpoints';
export const productsHttp: ProductsService = {
  list: (filters) => getValidated(endpoints.products, productPageSchema, filters),
  async get(id) {
    try {
      return await getValidated(endpoints.product(id), productSchema);
    } catch (e) {
      if (e instanceof ApiError && e.status === 404) return null;
      throw e;
    }
  },
};
