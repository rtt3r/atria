import { Command, Ellipsis, Home, Users } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

export const Root = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="flex-1 flex">
        <aside className="h-full w-16 transition-transform border-r border-gray-800">
          <div className="flex h-full flex-col overflow-y-auto py-3">
            <a
              href="/"
              className="flex items-center justify-center w-full mb-10 h-10"
            >
              <Command />
              <span className="sr-only ml-3 text-base font-semibold">
                Atria
              </span>
            </a>
            <ul className="flex flex-col items-center justify-center gap-2 text-sm font-medium">
              <li className="w-full flex items-center justify-center py-3 has-[.active]:text-primary has-[.active]:border-l-2 has-[.active]:border-r-2 has-[.active]:border-r-transparent has-[.active]:border-l-primary">
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <Home />
                  <span className="sr-only ml-3 flex-1 whitespace-nowrap">
                    Home
                  </span>
                </NavLink>
              </li>
              <li className="w-full flex items-center justify-center py-3 has-[.active]:text-primary has-[.active]:border-l-2 has-[.active]:border-r-2 has-[.active]:border-r-transparent has-[.active]:border-l-primary">
                <NavLink
                  to="/tasks"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <Users />
                  <span className="sr-only ml-3 flex-1 whitespace-nowrap">
                    Tasks
                  </span>
                </NavLink>
              </li>
            </ul>
            <div className="mt-auto flex">
              <div className="w-full flex items-center justify-center">
                <span className="sr-only text-sm font-medium">
                  email@example.com
                </span>
                <Ellipsis />
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
      <footer className="flex justify-center items-center w-full h-8 text-xs border-t border-gray-800">
        Footer
      </footer>
    </div>
  );
};
