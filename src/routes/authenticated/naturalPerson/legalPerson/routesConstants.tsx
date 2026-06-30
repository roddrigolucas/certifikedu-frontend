import { pagePaths } from '@/constants/navigation/pagePaths';

import { TemplateSharePage } from '@/pages/App/NaturalPerson/Certificates';
import CertificateIssuerPageNaturalPerson from '@/pages/App/NaturalPerson/Certificates/Issuer';
import CertificatesPageNaturalPerson from '@/pages/App/NaturalPerson/Certificates/List';
import CarouselInternalImages from '@/pages/App/NaturalPerson/Certificates/Template/Interal';
import TemplatesCard from '@/pages/App/NaturalPerson/Certificates/Template/List';
import CertificateViewPageNaturalPerson from '@/pages/App/NaturalPerson/Certificates/View';
import {
  CourseEditPage,
  CourseListPage,
  CourseRegisterPage,
} from '@/pages/App/NaturalPerson/Courses';
import CurriculumEditPage from '@/pages/App/NaturalPerson/Courses/Curriculum/Edit';
import CurriculumRegisterPage from '@/pages/App/NaturalPerson/Courses/Curriculum/Register';
import CourseListPageBySchool from '@/pages/App/NaturalPerson/Courses/View';
import DashboardPJPage from '@/pages/App/NaturalPerson/Dashboard';
import HistoryCertificatesListPage from '@/pages/App/NaturalPerson/History/Certificates/List';
import HistoryCertificatesViewPage from '@/pages/App/NaturalPerson/History/Certificates/View';
import HistoryComplianceListPage from '@/pages/App/NaturalPerson/History/Compliance/List';
import LevelingPJPage from '@/pages/App/NaturalPerson/LevelingPJ';
import ReportsViewPage from '@/pages/App/NaturalPerson/Reports/View';
import {
  SchoolEditPage,
  SchoolListPage,
  SchoolRegisterPage,
} from '@/pages/App/NaturalPerson/Schools';
import {
  StudentsBySchoolListPage,
  StudentsBySchoolRegisterPage,
} from '@/pages/App/NaturalPerson/Schools/Students';
import { StudentRegisterPage, StudentsPage } from '@/pages/App/NaturalPerson/Students';
import CSVValidator from '@/pages/App/NaturalPerson/Students/Register/bulk';
import StudentRegisterPageUnitary from '@/pages/App/NaturalPerson/Students/Register/unitary';
import { TrailsListPage } from '@/pages/App/NaturalPerson/Trails';
import TrailEditPage from '@/pages/App/NaturalPerson/Trails/Edit';
import TrailRegisterPage from '@/pages/App/NaturalPerson/Trails/Register';
import TrailViewPage from '@/pages/App/NaturalPerson/Trails/View';
import CreateAchievementForm from '@/components/pages/App/NaturalPerson/LevelingPJ/Achievement/AchievementForm';
import AchievementDetailPJ from '@/components/pages/App/NaturalPerson/LevelingPJ/Achievement/AchivementDetail';
import MissionsDetailPJ from '@/components/pages/App/NaturalPerson/LevelingPJ/Missions/MissionDetail';
import CreateMissionForm from '@/components/pages/App/NaturalPerson/LevelingPJ/Missions/MissionForm';

interface RouteConfig {
  component: React.ElementType;
  name: string;
  description: string;
  path: string;
}

export const routesConfigPJFPF: RouteConfig[] = [
  {
    component: DashboardPJPage,
    name: 'Dashboard',
    description: 'Dashboard page',
    path: pagePaths.authenticated.naturalPerson.dashboard,
  },
  {
    component: CourseListPage,
    name: 'Course List',
    description: 'Course list page',
    path: pagePaths.authenticated.naturalPerson.school.courses.list,
  },
  {
    component: CourseRegisterPage,
    name: 'Course Register',
    description: 'Course register page',
    path: pagePaths.authenticated.naturalPerson.school.courses.create,
  },
  {
    component: CurriculumRegisterPage,
    name: 'Course Curriculum Create',
    description: 'Course curriculum create page',
    path: pagePaths.authenticated.naturalPerson.course.curriculum.create,
  },
  {
    component: CurriculumEditPage,
    name: 'Course Curriculum Edit',
    description: 'Course curriculum edit page',
    path: pagePaths.authenticated.naturalPerson.course.curriculum.edit,
  },
  {
    component: CourseEditPage,
    name: 'Course Edit',
    description: 'Course edit page',
    path: pagePaths.authenticated.naturalPerson.course.edit,
  },
  {
    component: CourseListPageBySchool,
    name: 'Course List by School',
    description: 'Course list by school page',
    path: pagePaths.authenticated.naturalPerson.course.root,
  },
  {
    component: SchoolListPage,
    name: 'School List',
    description: 'School list page',
    path: pagePaths.authenticated.naturalPerson.school.root,
  },
  {
    component: SchoolRegisterPage,
    name: 'School Register',
    description: 'School register page',
    path: pagePaths.authenticated.naturalPerson.school.create,
  },
  {
    component: SchoolEditPage,
    name: 'School Edit',
    description: 'School edit page',
    path: pagePaths.authenticated.naturalPerson.school.edit,
  },
  {
    component: TrailsListPage,
    name: 'Trails List',
    description: 'Trails list page',
    path: pagePaths.authenticated.naturalPerson.trail.root,
  },
  {
    component: TrailRegisterPage,
    name: 'Trail Register',
    description: 'Trail register page',
    path: pagePaths.authenticated.naturalPerson.trail.create,
  },
  {
    component: TrailEditPage,
    name: 'Trail Edit',
    description: 'Trail v page',
    path: pagePaths.authenticated.naturalPerson.trail.edit,
  },
  {
    component: TrailViewPage,
    name: 'Trail View',
    description: 'Trail view page',
    path: pagePaths.authenticated.naturalPerson.trail.view,
  },
  {
    component: StudentsPage,
    name: 'Students',
    description: 'Students page',
    path: pagePaths.authenticated.naturalPerson.student.root,
  },
  {
    component: StudentRegisterPage,
    name: 'Student Register',
    description: 'Student register page',
    path: pagePaths.authenticated.naturalPerson.student.create,
  },
  {
    component: StudentRegisterPageUnitary,
    name: 'Student Register Unitary',
    description: 'Student register unitary page',
    path: pagePaths.authenticated.naturalPerson.student.unitaryCreate,
  },
  {
    component: CSVValidator,
    name: 'CSV Validator',
    description: 'CSV validator page',
    path: pagePaths.authenticated.naturalPerson.student.bulkCreate,
  },
  {
    component: StudentsBySchoolListPage,
    name: 'Students by School List',
    description: 'Students by school list page',
    path: pagePaths.authenticated.naturalPerson.school.students.root,
  },
  {
    component: StudentsBySchoolRegisterPage,
    name: 'Students by School Register',
    description: 'Students by school register page',
    path: pagePaths.authenticated.naturalPerson.school.students.create,
  },
  {
    component: CertificateIssuerPageNaturalPerson,
    name: 'Certificate Issuer',
    description: 'Certificate issuer page',
    path: pagePaths.authenticated.naturalPerson.certificates.create,
  },
  {
    component: CertificatesPageNaturalPerson,
    name: 'Certificates List',
    description: 'Certificates list page',
    path: pagePaths.authenticated.naturalPerson.certificates.list,
  },
  {
    component: CertificateViewPageNaturalPerson,
    name: 'Certificate View',
    description: 'Certificate view page',
    path: pagePaths.authenticated.naturalPerson.certificates.view,
  },
  {
    component: TemplateSharePage,
    name: 'Template Share',
    description: 'Template share page',
    path: pagePaths.authenticated.naturalPerson.template.view,
  },
  {
    component: TemplatesCard,
    name: 'Templates Card',
    description: 'Templates card page',
    path: pagePaths.authenticated.naturalPerson.template.root,
  },
  {
    component: CarouselInternalImages,
    name: 'Carousel Internal Images',
    description: 'Carousel internal images page',
    path: pagePaths.authenticated.naturalPerson.template.backgroundImage,
  },
  {
    component: HistoryComplianceListPage,
    name: 'History for compliance',
    description: 'History for compliance page',
    path: pagePaths.authenticated.naturalPerson.history.compliance,
  },
  {
    component: HistoryCertificatesListPage,
    name: 'History for certificate emission',
    description: 'History for certificate emission page',
    path: pagePaths.authenticated.naturalPerson.history.certificates.list,
  },
  {
    component: HistoryCertificatesViewPage,
    name: 'History for certificate emission',
    description: 'History for certificate emission page',
    path: pagePaths.authenticated.naturalPerson.history.certificates.view,
  },
  {
    component: ReportsViewPage,
    name: 'Reports',
    description: 'Reports page',
    path: pagePaths.authenticated.naturalPerson.reports,
  },
  {
    component: LevelingPJPage,
    name: 'LevelingPJ',
    description: 'Leveling PJ page',
    path: pagePaths.authenticated.naturalPerson.levelingPJ.root,
  },
  {
    component: MissionsDetailPJ,
    name: 'MissionDetail',
    description: 'Mission Details page',
    path: pagePaths.authenticated.naturalPerson.levelingPJ.missionDetail,
  },
  {
    component: AchievementDetailPJ,
    name: 'Achivement Detail',
    description: 'Mission Details page',
    path: pagePaths.authenticated.naturalPerson.levelingPJ.achievementDetail,
  },
  {
    component: CreateAchievementForm,
    name: 'Create Achievement',
    description: 'Create achievement page',
    path: pagePaths.authenticated.naturalPerson.levelingPJ.createAchievement,
  },
  {
    component: CreateMissionForm,
    name: 'Create Mission',
    description: 'Create mission page',
    path: pagePaths.authenticated.naturalPerson.levelingPJ.createMission,
  },
];
