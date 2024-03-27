import { cn } from '@/lib/utils';
import { forwardRef, HTMLAttributes } from 'react';

interface FooterProps extends HTMLAttributes<HTMLElement> {}

const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <footer
        className={cn(
          'flex justify-center items-center w-full text-xs border-t',
          className
        )}
        {...props}
        ref={ref}
      >
        © 2024 Copyright Atria
      </footer>
    );
  }
);

Footer.displayName = 'Footer';

export { Footer };
