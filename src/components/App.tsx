import { FC } from 'react';

import { useRoutes } from 'hooks/useRoutes';

export const App: FC = () => {
  const routes = useRoutes();
  return routes;
};
