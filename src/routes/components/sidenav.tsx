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
              className="flex items-center justify-center h-14 w-full border-x-4 border-transparent text-primary/50 has-[.is-active]:border-l-primary has-[.is-active]:text-primary/75 hover:border-l-primary/75 hover:text-primary/75"
              key={item.to}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn('flex items-center justify-center gap-4 w-full h-full', {
                    'is-active': isActive
                  })
                }
              >
                {item.icon}
                <span className="sr-only">{item.label}</span>
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
