import { PDFDownloadLink } from '@react-pdf/renderer';
import { useQuery } from '@tanstack/react-query';
import {
  BriefcaseIcon,
  DownloadIcon,
  EditIcon,
  FileTextIcon,
  GlobeIcon,
  GraduationCapIcon,
  MailIcon,
  PhoneIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { ApplicationLayout } from '@/components/layouts/app';
import { PageSkeletonFull } from '@/components/layouts/app/shared/PageSkeleton';
import { Button } from '@/components/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/ui/card';

import { useProfileStore } from '@/stores/naturalPerson/profile';

import { ResumeService } from '@/services/entities/app/core/resume';

import { ResumePDF } from '../PDF';
import { EducationItem } from './EducationItem';
import { ExperienceItem } from './ExperienceItem';
import { LanguageItem } from './LanguageItem';

export default function ResumeShowPage() {
  const navigate = useNavigate();
  const { profileData } = useProfileStore();

  const { data: resumeList, isLoading: isLoadingResumes } = useQuery(
    ['resumes'],
    ResumeService.ListResumes,
    {
      onError: () => {
        toast.error('Erro ao carregar a lista de currículos');
      },
    },
  );

  const resumeId = resumeList?.resumes[0]?.resumeId;

  const handleEdit = () => {
    navigate(`/resumes/edit/${resumeId}`);
  };

  const { data: resume, isLoading: isLoadingResume } = useQuery(
    ['resume', resumeId],
    () => ResumeService.GetResume(resumeId!),
    {
      enabled: !!resumeId,
      onError: () => {
        toast.error('Erro ao carregar o currículo');
      },
    },
  );

  if (isLoadingResumes || (resumeId && isLoadingResume)) {
    return (
      <ApplicationLayout icon={FileTextIcon} title="Meu Currículo">
        <PageSkeletonFull />
      </ApplicationLayout>
    );
  }

  return (
    <ApplicationLayout
      description="Esta página exibe o seu currículo, apresentando informações de contato, resumo profissional, experiências, formações acadêmicas e idiomas. Com uma interface moderna e organizada, é possível editar o currículo ou baixá-lo em formato PDF para compartilhar facilmente."
      icon={FileTextIcon}
      title="Meu Currículo"
      hideCredits
    >
      {resume && (
        <div className="flex flex-col gap-6 px-4 py-6">
          {/* Actions Section */}
          <section className="flex justify-end gap-4">
            <Button onClick={handleEdit} variant="secondary">
              <EditIcon className="mr-2 size-5" /> Editar Currículo
            </Button>
            <PDFDownloadLink
              document={<ResumePDF resume={resume} profileData={profileData} />}
              fileName="meu-curriculo.pdf"
            >
              <Button variant="outline">
                <DownloadIcon className="mr-2 size-5" /> Baixar como PDF
              </Button>
            </PDFDownloadLink>
          </section>

          {/* Profile Section */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-800">
                {profileData?.naturalPerson.name}
              </CardTitle>
              <p className="text-lg text-gray-600">{resume.title}</p>
            </CardHeader>
            <CardContent className="">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <MailIcon className="size-4" />
                  <p>{profileData?.naturalPerson.email}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <PhoneIcon className="size-4" />
                  <p>{profileData?.naturalPerson.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Sobre</CardTitle>
            </CardHeader>
            <CardContent>
              {resume.description && (
                <p className="whitespace-pre-line text-gray-700">{resume.description}</p>
              )}
            </CardContent>
          </Card>
          {/* Experience Section */}
          {resume.experiences.length > 0 && (
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                  <BriefcaseIcon className="size-6 text-indigo-600" />
                  Experiência Profissional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {resume.experiences.map((exp) => (
                  <ExperienceItem key={exp.resumeExperienceId} experience={exp} />
                ))}
              </CardContent>
            </Card>
          )}

          {/* Education Section */}
          {resume.educations.length > 0 && (
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                  <GraduationCapIcon className="size-6 text-indigo-600" />
                  Educação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {resume.educations.map((edu) => (
                  <EducationItem key={edu.resumeEducationId} education={edu} />
                ))}
              </CardContent>
            </Card>
          )}

          {/* Languages Section */}
          {resume.languages.length > 0 && (
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                  <GlobeIcon className="size-6 text-indigo-600" />
                  Idiomas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resume.languages.map((lang) => (
                  <LanguageItem key={lang.resumeLanguageId} language={lang} />
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </ApplicationLayout>
  );
}
