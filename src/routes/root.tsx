import { Outlet } from 'react-router-dom';

import { Sidebar } from './components/sidebar';
import { Header } from './components/header';

export const Root = () => {
  return (
    <div className="flex min-h-screen h-full w-full">
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 flex">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-y-auto">
            <main className="flex-1 p-8">
              <Outlet />
            </main>
            <footer className="flex justify-center items-center w-full h-10 text-xs border-t">
              © 2024 Copyright Atria
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
