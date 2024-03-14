import { Outlet } from 'react-router-dom';

import { Sidebar } from './components/sidebar';

export const Root = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="flex-1 flex">
        <Sidebar />

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
