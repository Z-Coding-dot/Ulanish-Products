// SAMPLE DATA ONLY — replace all catalog content before launch.
import type { Product, Company, Category } from '@/api/types';
export const companies: Company[] = [
  {
    id: 'sona',
    name: { en: 'Sona', 'fa-AF': 'سونا', ps: 'سونا' },
    monogram: 'S',
    description: {
      en: 'A company in the sample collection.',
      'fa-AF': 'یک شرکت در فهرست نمونه.',
      ps: 'په بېلګیز لړلیک کې یو شرکت.',
    },
  },
  {
    id: 'nava',
    name: { en: 'Nava', 'fa-AF': 'نوا', ps: 'نوا' },
    monogram: 'N',
    description: {
      en: 'A company in the sample collection.',
      'fa-AF': 'یک شرکت در فهرست نمونه.',
      ps: 'په بېلګیز لړلیک کې یو شرکت.',
    },
  },
  {
    id: 'arya',
    name: { en: 'Arya', 'fa-AF': 'آریا', ps: 'آریا' },
    monogram: 'A',
    description: {
      en: 'A company in the sample collection.',
      'fa-AF': 'یک شرکت در فهرست نمونه.',
      ps: 'په بېلګیز لړلیک کې یو شرکت.',
    },
  },
  {
    id: 'mehr',
    name: { en: 'Mehr', 'fa-AF': 'مهر', ps: 'مهر' },
    monogram: 'M',
    description: {
      en: 'A company in the sample collection.',
      'fa-AF': 'یک شرکت در فهرست نمونه.',
      ps: 'په بېلګیز لړلیک کې یو شرکت.',
    },
  },
  {
    id: 'roshan',
    name: { en: 'Roshan', 'fa-AF': 'روشن', ps: 'روښان' },
    monogram: 'R',
    description: {
      en: 'A company in the sample collection.',
      'fa-AF': 'یک شرکت در فهرست نمونه.',
      ps: 'په بېلګیز لړلیک کې یو شرکت.',
    },
  },
  {
    id: 'pamir',
    name: { en: 'Pamir', 'fa-AF': 'پامیر', ps: 'پامیر' },
    monogram: 'P',
    description: {
      en: 'A company in the sample collection.',
      'fa-AF': 'یک شرکت در فهرست نمونه.',
      ps: 'په بېلګیز لړلیک کې یو شرکت.',
    },
  },
];
export const categories: Category[] = [
  {
    id: 'digital',
    name: { en: 'Software & digital', 'fa-AF': 'نرم‌افزار و دیجیتال', ps: 'سافټویر او ډیجیټل' },
    image: '/images/category-portrait.svg',
  },
  {
    id: 'electronics',
    name: { en: 'Electronics', 'fa-AF': 'وسایل الکترونیکی', ps: 'برېښنايي وسایل' },
    image: '/images/category-square.svg',
  },
  {
    id: 'home',
    name: { en: 'Home & living', 'fa-AF': 'خانه و زندگی', ps: 'کور او ژوند' },
    image: '/images/category-square.svg',
  },
  {
    id: 'office',
    name: { en: 'Office essentials', 'fa-AF': 'لوازم دفتر', ps: 'د دفتر وسایل' },
    image: '/images/category-square.svg',
  },
  {
    id: 'accessories',
    name: { en: 'Everyday accessories', 'fa-AF': 'لوازم روزمره', ps: 'ورځني لوازم' },
    image: '/images/category-square.svg',
  },
];
export const products: Product[] = [
  {
    id: 115,
    code: '2',
    name: { en: 'Sona Database', 'fa-AF': 'دیتابیس سونا', ps: 'د سونا ډیټابېس' },
    companyId: 'sona',
    categoryId: 'digital',
    price: 5000,
    stock: 'in',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-01T09:00:00Z',
  },
  {
    id: 116,
    code: '101',
    name: { en: 'Wireless headphones', 'fa-AF': 'هدفون بی‌سیم', ps: 'بې‌سیم غوږۍ' },
    companyId: 'nava',
    categoryId: 'electronics',
    price: 2400,
    stock: 'in',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-02T09:00:00Z',
  },
  {
    id: 117,
    code: '102',
    name: { en: 'Ceramic desk lamp', 'fa-AF': 'چراغ رومیزی سرامیکی', ps: 'سرامیکي مېز څراغ' },
    companyId: 'arya',
    categoryId: 'home',
    price: 950,
    stock: 'in',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-03T09:00:00Z',
  },
  {
    id: 118,
    code: '103',
    name: { en: 'Everyday notebook', 'fa-AF': 'کتابچهٔ روزانه', ps: 'ورځنۍ کتابچه' },
    companyId: 'mehr',
    categoryId: 'office',
    price: 650,
    stock: 'in',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-04T09:00:00Z',
  },
  {
    id: 119,
    code: '104',
    name: { en: 'Canvas carry bag', 'fa-AF': 'خریطهٔ پارچه‌ای', ps: 'ټوکرۍ کڅوړه' },
    companyId: 'roshan',
    categoryId: 'accessories',
    price: 3200,
    stock: 'in',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-05T09:00:00Z',
  },
  {
    id: 120,
    code: '105',
    name: { en: 'Compact speaker', 'fa-AF': 'اسپیکر کوچک', ps: 'کوچنۍ غږن' },
    companyId: 'pamir',
    categoryId: 'electronics',
    price: 7200,
    stock: 'out',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-06T09:00:00Z',
  },
  {
    id: 121,
    code: '106',
    name: {
      en: 'Office management software',
      'fa-AF': 'نرم‌افزار مدیریت دفتر',
      ps: 'د دفتر د سمبالښت سافټویر',
    },
    companyId: 'sona',
    categoryId: 'digital',
    price: 1500,
    stock: 'in',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-07T09:00:00Z',
  },
  {
    id: 122,
    code: '107',
    name: { en: 'Glass water carafe', 'fa-AF': 'کوزهٔ آب شیشه‌ای', ps: 'ښیښه‌يي د اوبو لوښی' },
    companyId: 'nava',
    categoryId: 'home',
    price: 850,
    stock: 'in',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-08T09:00:00Z',
  },
  {
    id: 123,
    code: '108',
    name: { en: 'Desk organizer', 'fa-AF': 'نظم‌دهندهٔ میز', ps: 'د مېز سمبالوونکی' },
    companyId: 'arya',
    categoryId: 'office',
    price: 1200,
    stock: 'in',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-09T09:00:00Z',
  },
  {
    id: 124,
    code: '109',
    name: { en: 'Leather card holder', 'fa-AF': 'جاکارتی چرمی', ps: 'څرمنیز کارت ساتونکی' },
    companyId: 'mehr',
    categoryId: 'accessories',
    price: 1100,
    stock: 'in',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-10T09:00:00Z',
  },
  {
    id: 125,
    code: '110',
    name: {
      en: 'USB desk light',
      'fa-AF': 'چراغ رومیزی با اتصال یو‌اس‌بی',
      ps: 'د یو‌اېس‌بي مېز څراغ',
    },
    companyId: 'roshan',
    categoryId: 'electronics',
    price: 6800,
    stock: 'in',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-11T09:00:00Z',
  },
  {
    id: 126,
    code: '111',
    name: { en: 'Accounting software', 'fa-AF': 'نرم‌افزار حسابداری', ps: 'د حسابدارۍ سافټویر' },
    companyId: 'pamir',
    categoryId: 'digital',
    price: 1800,
    stock: 'in',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-12T09:00:00Z',
  },
  {
    id: 127,
    code: '112',
    name: { en: 'Cotton throw', 'fa-AF': 'روانداز نخی', ps: 'نخي پوښ' },
    companyId: 'sona',
    categoryId: 'home',
    price: 2400,
    stock: 'in',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-13T09:00:00Z',
  },
  {
    id: 128,
    code: '113',
    name: { en: 'Document folder', 'fa-AF': 'پوشهٔ اسناد', ps: 'د اسنادو پوښۍ' },
    companyId: 'nava',
    categoryId: 'office',
    price: 950,
    stock: 'out',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-14T09:00:00Z',
  },
  {
    id: 129,
    code: '114',
    name: { en: 'Travel pouch', 'fa-AF': 'کیسهٔ سفر', ps: 'د سفر کڅوړه' },
    companyId: 'arya',
    categoryId: 'accessories',
    price: 650,
    stock: 'in',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-15T09:00:00Z',
  },
  {
    id: 130,
    code: '115',
    name: { en: 'Portable charger', 'fa-AF': 'شارژر همراه', ps: 'لېږدېدونکی چارجر' },
    companyId: 'mehr',
    categoryId: 'electronics',
    price: 3200,
    stock: 'in',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-16T09:00:00Z',
  },
  {
    id: 131,
    code: '116',
    name: {
      en: 'Inventory software',
      'fa-AF': 'نرم‌افزار مدیریت موجودی',
      ps: 'د ګودام سمبالښت سافټویر',
    },
    companyId: 'roshan',
    categoryId: 'digital',
    price: 7200,
    stock: 'in',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-17T09:00:00Z',
  },
  {
    id: 132,
    code: '117',
    name: { en: 'Serving tray', 'fa-AF': 'سینی پذیرایی', ps: 'د مېلمستیا پتنوس' },
    companyId: 'pamir',
    categoryId: 'home',
    price: 1500,
    stock: 'in',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-18T09:00:00Z',
  },
  {
    id: 133,
    code: '118',
    name: { en: 'Writing set', 'fa-AF': 'مجموعهٔ نوشتن', ps: 'د لیکلو ټولګه' },
    companyId: 'sona',
    categoryId: 'office',
    price: 850,
    stock: 'in',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-19T09:00:00Z',
  },
  {
    id: 134,
    code: '119',
    name: { en: 'Woven key strap', 'fa-AF': 'بند کلید بافته‌شده', ps: 'اوبدل شوی کیلي بند' },
    companyId: 'nava',
    categoryId: 'accessories',
    price: 1200,
    stock: 'in',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-20T09:00:00Z',
  },
  {
    id: 135,
    code: '120',
    name: { en: 'Desktop keyboard', 'fa-AF': 'کیبورد رومیزی', ps: 'د مېز کیبورډ' },
    companyId: 'arya',
    categoryId: 'electronics',
    price: 1100,
    stock: 'out',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-21T09:00:00Z',
  },
  {
    id: 136,
    code: '121',
    name: { en: 'Scheduling software', 'fa-AF': 'نرم‌افزار برنامه‌ریزی', ps: 'د مهالوېش سافټویر' },
    companyId: 'mehr',
    categoryId: 'digital',
    price: 6800,
    stock: 'in',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-22T09:00:00Z',
  },
  {
    id: 137,
    code: '122',
    name: { en: 'Storage basket', 'fa-AF': 'سبد نگهداری', ps: 'د ساتلو ټوکرۍ' },
    companyId: 'roshan',
    categoryId: 'home',
    price: 1800,
    stock: 'in',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-23T09:00:00Z',
  },
  {
    id: 138,
    code: '123',
    name: { en: 'Office planner', 'fa-AF': 'دفتر برنامه‌ریزی', ps: 'د دفتر د پلان کتابچه' },
    companyId: 'pamir',
    categoryId: 'office',
    price: 2400,
    stock: 'in',
    images: ['/images/product.svg', '/images/category-portrait.svg'],
    specs: [
      {
        label: { en: 'Collection', 'fa-AF': 'مجموعه', ps: 'ټولګه' },
        value: { en: 'Sample product', 'fa-AF': 'محصول نمونه', ps: 'بېلګیز توکی' },
      },
      {
        label: { en: 'Details', 'fa-AF': 'جزئیات', ps: 'جزییات' },
        value: {
          en: 'Confirm with the store',
          'fa-AF': 'با فروشگاه تأیید کنید',
          ps: 'له پلورنځي سره تایید کړئ',
        },
      },
    ],
    description: {
      en: 'This is a sample catalog item. Contact Ulanish to confirm specifications, current price and availability before ordering.',
      'fa-AF':
        'این محصول نمونهٔ فهرست است. پیش از سفارش، مشخصات، قیمت فعلی و موجودی را از اولنیش بپرسید.',
      ps: 'دا د لړلیک بېلګیز توکی دی. له سپارښتنې مخکې ځانګړنې، اوسنۍ بیه او موجودیت له اولنیش څخه وپوښتئ.',
    },
    createdAt: '2026-09-24T09:00:00Z',
  },
];
export const heroSlides = [
  {
    id: 1,
    title: 'home.title',
    subtitle: 'home.subtitle',
    image: '/images/hero.svg',
    category: '',
  },
  {
    id: 2,
    title: 'hero.second',
    subtitle: 'hero.secondSub',
    image: '/images/banner.svg',
    category: 'office',
  },
  {
    id: 3,
    title: 'hero.third',
    subtitle: 'hero.thirdSub',
    image: '/images/hero.svg',
    category: 'home',
  },
  {
    id: 4,
    title: 'hero.fourth',
    subtitle: 'hero.fourthSub',
    image: '/images/banner.svg',
    category: '',
  },
];
