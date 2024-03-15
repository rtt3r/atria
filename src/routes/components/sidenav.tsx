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

const Sidenav = forwardRef<HTMLButtonElement, SidenavProps>(
  ({ className, items, ...props }, ref) => {
    return (
      <nav
        className={cn('flex flex-col w-full', className)}
        {...props}
        ref={ref}
      >
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li className="py-2" key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-start gap-4 text-white/75 hover:text-white hover:font-semibold',
                    {
                      'text-white font-semibold': isActive
                    }
                  )
                }
              >
                {item.icon}
                <span className="flex-1 whitespace-nowrap">{item.label}</span>
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
