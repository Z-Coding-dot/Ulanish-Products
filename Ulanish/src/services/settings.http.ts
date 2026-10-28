import { settingsSchema, type SettingsService } from '@/api/types';
import { getValidated } from '@/api/client';
import { endpoints } from '@/api/endpoints';
export const settingsHttp: SettingsService = {
  get: () => getValidated(endpoints.settings, settingsSchema),
};
