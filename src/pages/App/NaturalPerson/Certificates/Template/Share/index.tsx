/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { Clock9Icon, FileBadgeIcon, LucideIcon, School, UserPlus } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { ApplicationLayout } from '@/components/layouts/app';
import { PageSkeletonFull } from '@/components/layouts/app/shared/PageSkeleton';
import { BackButton } from '@/components/shared/BackButton';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { CanvasService } from '@/services/entities/app/canvas';
import { CertificateService } from '@/services/entities/app/legalPerson/certificates';
import { StudentService } from '@/services/entities/app/legalPerson/students';
import { IStudentIssuerCourse } from '@/services/entities/app/legalPerson/students/model';
import { ITemplate } from '@/services/entities/app/naturalPerson/templates/model';

import { CategoriesSection } from '@/utils/abilitiesSection';
import { getImageUrl } from '@/utils/image';

import EditTemplateViewPage from './Edit';
import UsersInCourseTablePage from './Issuer';
import { NavigationMenuTemplate } from './NavigationMenu';
import { QrCodeSection } from './QrCodeSection';

export interface IProps {
  origin: string;
  data: IStudentIssuerCourse[];
}

export default function TemplateSharePage() {
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [isOrigin, setIsOrigin] = useState<IProps | undefined>(undefined);

  const { selectedPJ } = useProfile();
  const setCreated = () => setIsCreated(!isCreated);
  const setEdited = () => setIsEdited(!isEdited);
  const { id } = useParams();

  const { isLoading, data } = useRequestProcessor().query(
    [`id: ${id}`, `edit: ${isEdited}`],
    async () =>
      selectedPJ
        ? await CertificateService.GetTemplatesByIdFunc(selectedPJ?.pjId ?? '', id ?? '')
        : await CanvasService.GetTemplateById(id ?? ''),
    {
      enabled: !!id,
      onSuccess: (data: ITemplate) => {
        return data;
      },
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  if (isLoading || !data || !id) {
    return (
      <ApplicationLayout icon={FileBadgeIcon} title={'Carregando ...'} hideCredits>
        {' '}
        <PageSkeletonFull />
      </ApplicationLayout>
    );
  }

  return (
    <ApplicationLayout icon={FileBadgeIcon} title={data.name} hideCredits>
      <div className="mb-48 flex-col rounded-xl bg-white">
        {isCreated ? (
          <UsersInCourseTablePage isOrigin={isOrigin} data={data} setCreated={setCreated} />
        ) : isEdited ? (
          <EditTemplateViewPage data={data} setEdited={setEdited} />
        ) : (
          <>
            <BackButton href={pagePaths.authenticated.naturalPerson.template.root}>
              Voltar
            </BackButton>
            <TemplateViewPage
              setCreated={setCreated}
              setEdited={setEdited}
              data={data}
              setIsOrigin={setIsOrigin}
            />
          </>
        )}
      </div>
    </ApplicationLayout>
  );
}

interface ITemplateProps {
  setCreated: () => void;
  setEdited: () => void;
  setIsOrigin: (id: IProps) => void;
  data: ITemplate;
}

function TemplateViewPage({ setCreated, setEdited, setIsOrigin, data }: Readonly<ITemplateProps>) {
  const { selectedPJ, isCanvas } = useProfile();

  const { mutate: GetStudentByCourse, isLoading: isLoadingCourse } = useMutation<
    IStudentIssuerCourse[],
    Error,
    any
  >(({ selectedPJ, courseId }) => StudentService.GetStudentByCourse(selectedPJ, courseId));

  const { mutate: GetStudentBySchool, isLoading: isLoadingSchool } = useMutation<
    IStudentIssuerCourse[],
    Error,
    any
  >(({ selectedPJ, schoolId }) => StudentService.GetStudentBySchool(selectedPJ, schoolId));

  const { mutate: GetCanvasStudent } = useMutation<IStudentIssuerCourse[], Error, any>(() =>
    CanvasService.GetStudents(),
  );

  function handleSubmit(origin: string) {
    if (origin === 'school' && selectedPJ) {
      GetStudentBySchool(
        { selectedPJ: selectedPJ?.pjId ?? '', schoolId: data?.schoolId },
        {
          onSuccess: (data: IStudentIssuerCourse[]) => {
            setIsOrigin({ origin: 'school', data: data });
            setCreated();
          },
          onError: (error: any) => {
            toast.error(`${error}`);
          },
        },
      );
    } else if (origin === 'course') {
      if (selectedPJ) {
        GetStudentByCourse(
          { selectedPJ: selectedPJ?.pjId ?? '', courseId: data?.courses[0]?.courseId },
          {
            onSuccess: (data: IStudentIssuerCourse[]) => {
              setIsOrigin({ origin: 'course', data: data });
              setCreated();
            },
            onError: (error: any) => {
              toast.error(`${error}`);
            },
          },
        );
      } else if (!!isCanvas) {
        GetCanvasStudent(undefined, {
          onSuccess: (data: IStudentIssuerCourse[]) => {
            setIsOrigin({ origin: 'course', data: data });
            setCreated();
          },
          onError: (error: any) => {
            toast.error(`${error}`);
          },
        });
      }
    } else if (origin === 'edit') {
      setEdited();
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        name={data.schoolName}
        autoIssuer={false}
        issuedAt={data?.createdAt ?? ''}
        updatedAt={data?.updatedAt ?? ''}
      />
      <div className=" flex flex-col gap-8 py-6 md:gap-10">
        <NavigationMenuTemplate
          handleSubmit={handleSubmit}
          data={{
            name: data?.name,
            school: data?.schoolName,
            course: data?.courses[0]?.courseName,
            isLoading: isLoadingCourse || isLoadingSchool,
            templateId: data?.templateId,
            quantity: data?.emissionQty,
          }}
        />
        <div className="-mt-1 gap-12 lg:grid lg:grid-cols-2">
          <div className="col-span-2 flex w-full flex-col gap-6 md:col-span-1 md:gap-8">
            <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200 ">
              <img
                src={getImageUrl(data?.imageTemplateUrl)}
                alt="Certificate"
                className="w-full md:pb-0"
              />
            </div>
            <div className="flex flex-col items-center gap-2 md:items-start">
              <h5 className="text-xs font-bold uppercase">
                QRCode para compartilhar com o público
              </h5>
              <QrCodeSection qrCodeData={data} />
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-6 md:col-span-1 md:gap-8 ">
            <div id="content" className="flex h-full flex-col justify-between gap-8">
              <div className="flex flex-col gap-2">
                <ul className="leading-[175%] text-slate-600">
                  {(data.description ?? 'Sem Descrição').split('\\n').map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="arroz flex flex-row gap-10">
                <SectionItem title="Total de Emissões" icon={UserPlus}>
                  <p className="text-slate-600">{data.emissionQty}</p>
                </SectionItem>
                <SectionItem title="Emitido por">
                  <p className="text-slate-600">{data.schoolName}</p>
                </SectionItem>
                {data.hoursWorkload > 0 && (
                  <SectionItem title="Carga Horária" icon={Clock9Icon}>
                    <p className="text-slate-600">
                      {Number(data.hoursWorkload) % 1 === 0
                        ? Number(data.hoursWorkload)
                        : Number(data.hoursWorkload).toFixed(2)}{' '}
                      horas
                    </p>
                  </SectionItem>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <CategoriesSection items={data?.abilities ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function formatDate(dateString: string): string {
  const dateParts = dateString.split('/');
  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  const year = parseInt(dateParts[2]);

  const date = new Date(year, month - 1, day); // Month is zero-based

  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  } as Intl.DateTimeFormatOptions;
  const formattedDate = date.toLocaleDateString('pt-BR', options);

  return formattedDate;
}

function Header({
  name,
  issuedAt,
  updatedAt,
}: Readonly<{
  name: string;
  issuedAt: string;
  autoIssuer?: boolean;
  updatedAt?: string;
}>) {
  return (
    <header className="rounded-lg border border-slate-200 bg-white">
      <div className="container inline-flex w-full items-center justify-center py-4 md:justify-between">
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
          <School />
          <div className="flex flex-col">
            <h1 className="md:text-md text-center text-sm font-normal md:text-left">
              Criado por <strong>{name}</strong> em{' '}
              <strong>{issuedAt && formatDate(issuedAt)}</strong>.
            </h1>
            {!(updatedAt === issuedAt) && (
              <h1 className="mt-1 text-center text-xs font-normal md:text-left">
                Última edição em {updatedAt && formatDate(updatedAt)}.
              </h1>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function SectionItem({
  title,
  children,
  ...props
}: Readonly<{
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full flex-col gap-2">
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="inline-flex items-center gap-2">
        {props.icon && <props.icon className="size-4 text-slate-600" />}
        {children}
      </div>
    </div>
  );
}
