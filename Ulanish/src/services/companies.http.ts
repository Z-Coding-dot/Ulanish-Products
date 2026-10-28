import { companySchema, type CompaniesService } from '@/api/types';
import { getValidated } from '@/api/client';
import { endpoints } from '@/api/endpoints';
export const companiesHttp: CompaniesService = {
  list: () => getValidated(endpoints.companies, companySchema.array()),
};
