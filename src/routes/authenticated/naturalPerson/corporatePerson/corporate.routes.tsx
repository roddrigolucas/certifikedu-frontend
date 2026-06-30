import { Navigate, Route, Routes } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import DashboardPageCorporate from '@/pages/App/CorporatePerson/Dashboard';
import CreateJobOppurnityPage from '@/pages/App/CorporatePerson/JobOpportunities/Create';
import JobProfilePage from '@/pages/App/CorporatePerson/JobOpportunities/UniqueJob';
import UniqueCandidate from '@/pages/App/CorporatePerson/JobOpportunities/UniqueJob/Candidates/UniqueCandidate';

export const CorporateRoutes = () => {
  const { authenticated } = pagePaths;

  return (
    <Routes>
      <Route
        index
        path={authenticated.corporatePerson.dashboard}
        element={<DashboardPageCorporate />}
      />
      <Route path={authenticated.corporatePerson.create} element={<CreateJobOppurnityPage />} />
      <Route path={authenticated.corporatePerson.view} element={<JobProfilePage />} />
      <Route path={authenticated.corporatePerson.candidate} element={<UniqueCandidate />} />

      <Route path="*" element={<Navigate to={authenticated.corporatePerson.dashboard} />} />
    </Routes>
  );
};
