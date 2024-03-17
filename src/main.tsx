import './global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomePage } from './routes/home/page.tsx';
import { Root } from './routes/root.tsx';
import { SettingsPage } from './routes/settings/page.tsx';
import { TasksPage } from './routes/tasks/page.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <h1>Not Found</h1>,
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
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
