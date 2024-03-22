import './global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom';

import { ThemeProvider } from './contexts/theme/provider';
import { FlowsPage } from './routes/flows/page';
import { HomePage } from './routes/home/page';
import { Root } from './routes/root';
import { RootBoundary } from './routes/root-boundary';
import { SettingsPage } from './routes/settings/page';
import { TasksPage } from './routes/tasks/page';

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
      },
      {
        path: 'flows',
        element: <FlowsPage />
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
