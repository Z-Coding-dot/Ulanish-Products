import { productPageSchema, type SearchService } from '@/api/types';
import { getValidated } from '@/api/client';
import { endpoints } from '@/api/endpoints';
export const searchHttp: SearchService = {
  search: (q, filters) => getValidated(endpoints.search, productPageSchema, { ...filters, q }),
};
