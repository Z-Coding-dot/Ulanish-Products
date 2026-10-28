export const navigation = [
  { to: '/', key: 'nav.home', icon: 'home' },
  { to: '/products', key: 'nav.products', icon: 'products' },
  { to: '/about', key: 'nav.about', icon: 'about' },
  { to: '/contact', key: 'nav.contact', icon: 'contact' },
] as const;
export const legalNavigation = [
  { to: '/terms', key: 'nav.terms' },
  { to: '/policies', key: 'nav.policies' },
  { to: '/reseller-terms', key: 'nav.reseller' },
] as const;
