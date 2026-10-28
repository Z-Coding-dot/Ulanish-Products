import type { CompaniesService } from '@/api/types';
import { companies } from '@/data/sample';
import { delay } from '@/utils/helpers';
export const companiesMock: CompaniesService = {
  async list() {
    await delay();
    return companies;
  },
};
