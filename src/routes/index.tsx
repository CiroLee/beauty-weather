import { createHashRouter } from 'react-router-dom';
import Layout from '@/layout';
import Home from '@/pages/home';
import Demo from '@/pages/dmeo';
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
        path: '/demo',
        id: 'demo',
        element: <Demo />,
      },
    ],
  },
]);
