import { Outlet } from 'react-router-dom';

import { Sidebar } from './components/sidebar';
import { Header } from './components/header';
import { Footer } from './components/footer';

export const Root = () => {
  return (
    <div className="flex-1 flex flex-col">
      <Header className="min-h-20 max-h-20" />
      <div className="flex-1 flex">
        <Sidebar className="min-w-16 max-w-16" />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">
            <Outlet />
          </main>
          <Footer className="min-h-10 max-h-10" />
        </div>
      </div>
    </div>
  );
};
