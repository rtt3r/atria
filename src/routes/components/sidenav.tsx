import { cn } from '@/lib/utils';
import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

export interface NavigationItem {
  label: string;
  icon: ReactNode;
  to: string;
}

export interface SidenavProps extends HTMLAttributes<HTMLElement> {
  items: NavigationItem[];
}

const Sidenav = forwardRef<HTMLElement, SidenavProps>(
  ({ className, items, ...props }, ref) => {
    return (
      <nav
        className={cn('flex flex-col w-full', className)}
        {...props}
        ref={ref}
      >
        <ul className="flex flex-col items-center justify-center w-full">
          {items.map((item) => (
            <li
              className="flex items-center justify-center h-14 w-full border-x-2 border-transparent text-secondary/75 has-[.is-active]:border-l-secondary has-[.is-active]:text-secondary hover:border-l-secondary hover:text-secondary"
              key={item.to}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn('flex items-center justify-start gap-4', {
                    'is-active': isActive
                  })
                }
              >
                {item.icon}
                <span className="sr-only ml-3 flex-1 whitespace-nowrap">
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
);

Sidenav.displayName = 'Sidenav';

export { Sidenav };
