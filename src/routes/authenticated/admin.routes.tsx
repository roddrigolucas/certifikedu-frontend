import { Navigate, Route, Routes } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import {
  AdmimAbilitiesPage,
  AdmimEmailsPage,
  AdminCreateEmail,
  AdminCreatePlan,
  AdminEditEmail,
  AdminEditPlan,
  AdminPlansPage,
  AdminUsersPage,
  AdminUserViewPage,
} from '@/pages/App/Admin';
import AdminCreateAbility from '@/pages/App/Admin/Abilities/Create';
import AdminEditAbility from '@/pages/App/Admin/Abilities/Edit';
import AdminCompliancePage from '@/pages/App/Admin/Compliance/View';
import WebSocketComponent from '@/pages/App/Admin/PDI/Websocket';
import CarouselInternalImages from '@/pages/App/NaturalPerson/Certificates/Template/Interal';

export const AdminRoutes = () => {
  const { authenticated } = pagePaths;

  return (
    <Routes>
      <Route index path={authenticated.admin.users.root} element={<AdminUsersPage />} />
      <Route path={authenticated.admin.users.view} element={<AdminUserViewPage />} />
      <Route path={authenticated.admin.plans.root} element={<AdminPlansPage />} />
      <Route path={authenticated.admin.backgroundImage} element={<CarouselInternalImages />} />
      <Route path={authenticated.admin.plans.create} element={<AdminCreatePlan />} />
      <Route path={authenticated.admin.plans.edit} element={<AdminEditPlan />} />
      <Route path={authenticated.admin.pdi.train} element={<WebSocketComponent />} />
      <Route path={authenticated.admin.compliance} element={<AdminCompliancePage />} />

      <Route path="*" element={<Navigate to={authenticated.admin.users.root} />} />
      <Route path={authenticated.admin.emails.root} element={<AdmimEmailsPage />} />
      <Route path={authenticated.admin.emails.create} element={<AdminCreateEmail />} />
      <Route path={authenticated.admin.emails.edit} element={<AdminEditEmail />} />
      <Route path={authenticated.admin.abilities.root} element={<AdmimAbilitiesPage />} />
      <Route path={authenticated.admin.abilities.create} element={<AdminCreateAbility />} />
      <Route path={authenticated.admin.abilities.edit} element={<AdminEditAbility />} />
    </Routes>
  );
};
