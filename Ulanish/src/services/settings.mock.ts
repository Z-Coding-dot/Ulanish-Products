import type { SettingsService } from '@/api/types';
import { delay } from '@/utils/helpers';
export const settingsMock: SettingsService = {
  async get() {
    await delay();
    return {
      catalogEnabled: true,
      announcement: {
        en: 'Sample catalog · Contact us to confirm availability',
        'fa-AF': 'فهرست نمونه · برای اطمینان از موجودی تماس بگیرید',
        ps: 'بېلګیز لړلیک · د موجودیت د ډاډ لپاره اړیکه ونیسئ',
      },
    };
  },
};
