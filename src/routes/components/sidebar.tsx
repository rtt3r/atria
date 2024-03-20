import { cn } from '@/lib/utils';
import { ClipboardList, Home, Waypoints } from 'lucide-react';
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
        },
        {
          to: '/flows',
          label: 'Flows',
          icon: <Waypoints />
        }
      ],
      []
    );

    return (
      <aside
        className={cn(
          'flex flex-col items-center justify-center border-r py-4 min-w-16 max-w-16',
          className
        )}
        {...props}
        ref={ref}
      >
        <Sidenav className="flex-1" items={navigationItems} />
      </aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export { Sidebar };
