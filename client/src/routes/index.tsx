import { Navigate, useRoutes } from 'react-router-dom';

import { Todos } from '@/features/todo';

export const AppRoutes = () => {
  const routes = [
    { path: '/', element: <Navigate to="/todos" replace /> },
    { path: '/todos', element: <Todos /> },
  ];
  const element = useRoutes(routes);
  return <>{element}</>;
};
