import './index.css';

import React, { ReactNode, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Team from './pages/Team';

import Dashboard from './pages/Dashboard';

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

import ErrorPage from './pages/ErrorPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Contact from './pages/Contact';
import About from './pages/About';

import CloudDisplay from './components/CloudDisplay';


const Admin = lazy(() => import('./pages/Admin'));
const Clock = lazy(() => import('./pages/Clock'));
const Roster = lazy(() => import('./pages/Roster'));
const Schedule = lazy(() => import('./pages/Schedule'));
const ScheduleView = lazy(() => import('./pages/ScheduleView'));

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
    path: '/team',
    element: <Team />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/about',
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/team',
    element: <Team />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/contact',
    element: <Contact />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
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
        element: (
          <LazyWrap>
            <Roster />
          </LazyWrap>
        ),
        errorElement: <ErrorPage />,
        
      },
      {
        path: '/dashboard/clock',
        element: (
          <LazyWrap>
            <Clock />
          </LazyWrap>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/dashboard/schedule',
        element: (
          <LazyWrap>
            <Schedule />
          </LazyWrap>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/dashboard/scheduleview',
        element: (
          <LazyWrap>
            <ScheduleView />
          </LazyWrap>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/dashboard/cloudDisplay',
        element: (
          <LazyWrap>
            <CloudDisplay />
          </LazyWrap>
        ),
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </AuthProvider>
  </React.StrictMode>
);
