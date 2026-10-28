import { productsMock } from './products.mock';
import { productsHttp } from './products.http';
import { companiesMock } from './companies.mock';
import { companiesHttp } from './companies.http';
import { categoriesMock } from './categories.mock';
import { categoriesHttp } from './categories.http';
import { searchMock } from './search.mock';
import { searchHttp } from './search.http';
import { settingsMock } from './settings.mock';
import { settingsHttp } from './settings.http';
const mock = import.meta.env.VITE_USE_MOCK !== 'false';
export const services = {
  products: mock ? productsMock : productsHttp,
  companies: mock ? companiesMock : companiesHttp,
  categories: mock ? categoriesMock : categoriesHttp,
  search: mock ? searchMock : searchHttp,
  settings: mock ? settingsMock : settingsHttp,
};
