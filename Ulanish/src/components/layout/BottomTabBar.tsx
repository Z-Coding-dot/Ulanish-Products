import { NavLink, useMatch } from 'react-router-dom';
import { Home, LayoutGrid, Info, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { navigation } from '@/data/navigation';
const icons = { home: Home, products: LayoutGrid, about: Info, contact: Phone };
export function BottomTabBar() {
  const { t } = useTranslation();
  const detail = useMatch('/products/:id');
  if (detail) return null;
  return (
    <nav className="tabbar" aria-label={t('footer.links')}>
      {navigation.map((n) => {
        const Icon = icons[n.icon];
        return (
          <NavLink to={n.to} end={n.to === '/'} key={n.to}>
            {({ isActive }) => (
              <>
                <Icon
                  size={24}
                  fill={isActive ? 'currentColor' : 'none'}
                  fillOpacity={isActive ? 0.12 : 0}
                  aria-hidden="true"
                />
                <span>{t(n.key)}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
