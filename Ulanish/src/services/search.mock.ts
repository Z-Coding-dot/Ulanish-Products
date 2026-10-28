import type { SearchService } from '@/api/types';
import { productsMock } from './products.mock';
export const searchMock: SearchService = {
  search: (q, filters) => productsMock.list({ ...filters, q }),
};
