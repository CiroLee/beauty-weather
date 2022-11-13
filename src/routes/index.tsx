import { createHashRouter } from 'react-router-dom';
import Layout from '@/layout';
import Home from '@/pages/home';
import List from '@/pages/list';
export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
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
]);
