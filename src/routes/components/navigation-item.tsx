import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type NavigationItemMode = 'expanded' | 'collapsed';

interface NavigationItemProps {
  to: string;
  label: string;
  mode: NavigationItemMode;
  children: ReactNode;
}

export const NavigationItem = ({
  to,
  label,
  mode,
  children
}: NavigationItemProps) => {
  return (
    <li className="w-full flex items-center justify-center py-3 border-x-2 border-transparent has-[.active]:text-primary has-[.active]:border-l-primary">
      <NavLink to={to} className={({ isActive }) => (isActive ? 'active' : '')}>
        {children}
        <span
          className={cn('ml-3 flex-1 whitespace-nowrap', {
            'sr-only': mode === 'collapsed'
          })}
        >
          {label}
        </span>
      </NavLink>
    </li>
  );
};
