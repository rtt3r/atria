import './global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomePage } from './routes/home/index.tsx';
import { Root } from './routes/root.tsx';
import { TasksPage } from './routes/tasks/index.tsx';

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
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
