import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import Register from './pages/Register';
import Admin from './pages/Admin';
import Clock from './pages/Clock';
import Roster from './pages/Roster';

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import EditModal from './components/EditModal';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <Login />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/register',
        element: <Register />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/dashboard/admin',
        element: <Admin />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/dashboard/roster',
        element: <Roster />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/dashboard/roster/EditModal',
            element: <EditModal />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: '/dashboard/clock',
        element: <Clock />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
