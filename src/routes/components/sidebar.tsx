import { ClipboardList, Home, Settings } from 'lucide-react';
import { useMemo } from 'react';

import { NavigationItem, Sidenav } from './sidenav';

export const Sidebar = () => {
  const navigationItems: NavigationItem[] = useMemo(
    () => [
      {
        to: '/',
        label: 'Home',
        icon: <Home />
      },
      {
        to: '/tasks',
        label: 'Tasks',
        icon: <ClipboardList />
      }
    ],
    []
  );

  const bottomNavigationItems: NavigationItem[] = useMemo(
    () => [
      {
        to: '/settings',
        label: 'Settings',
        icon: <Settings />
      }
    ],
    []
  );

  return (
    <aside className="flex flex-col items-center min-w-44 p-6 pb-4">
      <img src="/logo.svg" alt="Atria" className="mt-4 mb-8"></img>

      <Sidenav className="flex-1" items={navigationItems} />
      <Sidenav items={bottomNavigationItems} />
    </aside>
  );
};
