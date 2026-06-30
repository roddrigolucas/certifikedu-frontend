import { Navigate, Route, Routes } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { CardsPage, PlansPage, ProfilePage, UploadDocumentPage } from '@/pages/App/Core/Account';
import {
  CertificateIssuerPage,
  CertificatesPage,
  CertificateViewPage,
} from '@/pages/App/Core/Certificates';
import DashboardPage from '@/pages/App/Core/Dashboard';
import PDICards from '@/pages/App/Core/PDI';
import CreatePDIPage from '@/pages/App/Core/PDI/Create';
import CustomNodeFlow from '@/pages/App/Core/PDI/Graph';
import ProfessionalProfilePageEntry from '@/pages/App/Core/ProfessionalProfile';
import CreateOrUpdateResumePage from '@/pages/App/Core/Resume/CreateOrUpdate';
import SettingsPage from '@/pages/App/Core/Settings';
import AllLearningTrailsPage from '@/pages/App/NaturalPerson/LearningTrails/All';
import LearningTrailsCoursePage from '@/pages/App/NaturalPerson/LearningTrails/Course';
import LearningTrailDetailsViewPage from '@/pages/App/NaturalPerson/LearningTrails/Details';
import LearningTrailsViewPage from '@/pages/App/NaturalPerson/LearningTrails/View';
import LevelingPFPage from '@/pages/App/NaturalPerson/Leveling';
import Achievements from '@/components/pages/App/NaturalPerson/Leveling/Achievements/Achievements';
import AchievementsShare from '@/components/pages/App/NaturalPerson/Leveling/Achievements/AchievementsShare';
import AchievementDetail from '@/components/pages/App/NaturalPerson/Leveling/Achievements/AchivementDetail';
import MissionsDetail from '@/components/pages/App/NaturalPerson/Leveling/Missions/MissionDetail';
import Missions from '@/components/pages/App/NaturalPerson/Leveling/Missions/Missions';
import MissionShare from '@/components/pages/App/NaturalPerson/Leveling/Missions/MissionShare';
import PointsHistory from '@/components/pages/App/NaturalPerson/Leveling/Points/PointsHistory';
import Ranking from '@/components/pages/App/NaturalPerson/Leveling/Ranking/Ranking';

import useProfile from '@/hooks/core/useProfile';

import ResumePageEntry from '../../../pages/App/Core/Resume';

export const NaturalPersonRoutes = () => {
  const { authenticated } = pagePaths;
  const { isUserEnabled } = useProfile();

  return (
    <Routes>
      <Route index path={authenticated.dashboard} element={<DashboardPage />} />
      {/* Resume */}
      <Route path="/resumes" element={<ResumePageEntry />} />
      <Route path="/resumes/create" element={<CreateOrUpdateResumePage />} />
      <Route path="/resumes/edit/:resumeId" element={<CreateOrUpdateResumePage />} />
      {/* Professional Profile */}
      <Route
        index
        path={authenticated.professionalProfile}
        element={<ProfessionalProfilePageEntry />}
      />
      <Route path={authenticated.pdi.graph} element={<CustomNodeFlow />} />
      <Route index path={authenticated.pdi.root} element={<PDICards />} />
      <Route index path={authenticated.pdi.create} element={<CreatePDIPage />} />
      {/* Certificates */}
      <Route path={authenticated.certificates.root}>
        <Route index element={<Navigate to={authenticated.certificates.list} replace />} />
        <Route index path={authenticated.certificates.list} element={<CertificatesPage />} />
        <Route path={authenticated.certificates.view} element={<CertificateViewPage />} />
      </Route>

      {/* Profile */}
      <Route path={authenticated.account.profile} element={<ProfilePage />} />
      <Route path={authenticated.account.cards} element={<CardsPage />} />
      <Route path={authenticated.account.plans} element={<PlansPage />} />
      <Route
        path={authenticated.account.uploadDocument}
        element={
          !isUserEnabled ? <UploadDocumentPage /> : <Navigate to={authenticated.dashboard} />
        }
      />
      <Route
        path={authenticated.certificates.create}
        element={
          isUserEnabled ? (
            <CertificateIssuerPage />
          ) : (
            <Navigate to={authenticated.account.uploadDocument} />
          )
        }
      />
      <Route path={authenticated.settings.root} element={<SettingsPage />} />
      <Route path="*" element={<Navigate to={authenticated.dashboard} />} />
      {/*Leveling*/}
      <Route path={authenticated.leveling.root} element={<LevelingPFPage />} />
      <Route path={authenticated.leveling.ranking} element={<Ranking />} />
      <Route path={authenticated.leveling.achievements} element={<Achievements />} />
      <Route path={authenticated.leveling.achievementshare} element={<AchievementsShare />} />
      <Route path={authenticated.leveling.achievementdetail} element={<AchievementDetail />} />
      <Route path={authenticated.leveling.points} element={<PointsHistory />} />
      <Route path={authenticated.leveling.missions} element={<Missions />} />
      <Route path={authenticated.leveling.missiondetail} element={<MissionsDetail />} />
      <Route path={authenticated.leveling.missionshare} element={<MissionShare />} />

      {/* Trails */}
      <Route path={authenticated.learningTrails.root} element={<LearningTrailsViewPage />} />
      <Route
        path={authenticated.learningTrails.details}
        element={<LearningTrailDetailsViewPage />}
      />
      <Route path={authenticated.learningTrails.course} element={<LearningTrailsCoursePage />} />
      <Route path={authenticated.learningTrails.all} element={<AllLearningTrailsPage />} />
    </Routes>
  );
};
