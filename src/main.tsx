import './global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom';

import { HomePage } from './routes/home/page.tsx';
import { RootBoundary } from './routes/root-boundary.tsx';
import { Root } from './routes/root.tsx';
import { SettingsPage } from './routes/settings/page.tsx';
import { TasksPage } from './routes/tasks/page.tsx';
import { ThemeProvider } from './contexts/theme/provider.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <RootBoundary />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: 'tasks',
        element: <TasksPage />
      },
      {
        path: 'settings',
        element: <SettingsPage />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace={true} />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
