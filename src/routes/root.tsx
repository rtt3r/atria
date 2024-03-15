import { Outlet } from 'react-router-dom';

import { Sidebar } from './components/sidebar';

export const Root = () => {
  return (
    <div className="flex min-h-screen h-full w-full bg-primary text-primary-foreground">
      <Sidebar />

      <div className="flex-1 flex flex-col rounded-ss-[2rem] mt-2 bg-violet-50 text-slate-900 dark:bg-slate-800 dark:text-white">
        <main className="flex-1 flex flex-col pt-10 px-12 max-h-[calc(100vh-56px)] overflow-y-auto">
          <Outlet />
        </main>
        <footer className="flex justify-center items-center w-full h-8 text-xs mt-4">
          © 2024 Copyright Atria
        </footer>
      </div>
    </div>
  );
};
