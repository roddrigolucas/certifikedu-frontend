import { Navigate, Route, Routes } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { routesConfigPJFPF } from './routesConstants';

export const LegalPersonRoutes = () => {
  return (
    <Routes>
      {routesConfigPJFPF.map(({ component: Component, path, name }, index) => (
        <Route key={index + name} path={path} element={<Component />} />
      ))}
      <Route
        path="*"
        element={<Navigate to={pagePaths.authenticated.naturalPerson.dashboard} replace />}
      />
    </Routes>
  );
};
