import './index.css';

import React, { ReactNode, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

import Dashboard from './pages/Dashboard';

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import EditModal from './components/EditModal';
import ErrorPage from './pages/ErrorPage';

const Admin = lazy(() => import('./pages/Admin'));
const Clock = lazy(() => import('./pages/Clock'));
const Roster = lazy(() => import('./pages/Roster'));

interface LazyWrapProps {
  children: ReactNode;
}

const LazyWrap: React.FC<LazyWrapProps> = ({ children }) => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    }
  >
    {children}
  </Suspense>
);

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
        element: (
          <LazyWrap>
            <Admin />
          </LazyWrap>
        ),
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
