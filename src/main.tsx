import React from 'react';
import ReactDOM from 'react-dom/client';


import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'
import Layout from './pages/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <Layout><Dashboard /></Layout>
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);




// const router = createBrowserRouter([
//   { path: "/", element: <Landing />},
//   { path: "/dashboard", element: <Layout><Dashboard /></Layout>},
// ])