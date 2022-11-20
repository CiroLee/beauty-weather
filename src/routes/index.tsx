import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layout';
import ErrorBoundary from '@/pages/ErrorBoundary';
import Home from '@/pages/home';
import List from '@/pages/list';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: '/',
          id: 'home',
          element: <Home />,
        },
        {
          path: '/list',
          id: 'list',
          element: <List />,
        },
      ],
    },
  ],
  {
    basename: '/beauty-weather/',
  },
);
