import { cn } from '@/lib/utils';
import { ClipboardList, Home, Settings } from 'lucide-react';
import { forwardRef, HTMLAttributes, useMemo } from 'react';

import { NavigationItem, Sidenav } from './sidenav';

interface SidebarProps extends HTMLAttributes<HTMLElement> {}

const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ className, ...props }, ref) => {
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
      <aside
        className={cn(
          'flex flex-col items-center justify-center border-r pt-4 pb-2 min-w-16 max-w-16',
          className
        )}
        {...props}
        ref={ref}
      >
        <img src="/logo.svg" alt="Atria" className="mb-8" width={32}></img>

        <Sidenav className="flex-1" items={navigationItems} />
        <Sidenav items={bottomNavigationItems} />
      </aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export { Sidebar };
