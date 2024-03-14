import { Button } from '@/components/ui/button';
import { Command, Home, Users, ChevronsRight } from 'lucide-react';
import { NavigationItem } from './navigation-item';

export const Sidebar = () => {
  return (
    <aside className="h-full transition-transform border-r border-gray-800">
      <div className="flex flex-col justify-start h-full overflow-y-auto">
        <a
          href="/"
          className="flex items-center justify-center w-full mb-10 h-10 pt-5"
        >
          <Command />
          <span className="sr-only ml-3 text-base font-semibold">Atria</span>
        </a>
        <ul className="flex-1 flex flex-col items-center justify-start gap-2 text-sm font-medium">
          <NavigationItem to="/" label="Home" mode="collapsed">
            <Home />
          </NavigationItem>
          <NavigationItem to="/tasks" label="Tasks" mode="collapsed">
            <Users />
          </NavigationItem>
        </ul>
        <div className="flex py-3">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-center"
          >
            <span className="sr-only text-sm font-medium">
              email@example.com
            </span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </aside>
  );
};
