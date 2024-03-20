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
          <div className="flex-1 flex flex-col max-h-[calc(100vh-5rem)] max-w-[calc(100vw-4rem)]">
            <main className="flex-1 p-8 overflow-y-auto">
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
