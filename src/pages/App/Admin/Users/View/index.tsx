import { FileBadgeIcon } from 'lucide-react';

import { ApplicationLayout } from '@/components/layouts/app';

export default function AdminUserViewPage() {
  // const navigate = useNavigate();
  // const { id } = useParams();
  // const [imageBuffer, setImageBuffer] = useState<string | undefined>(undefined);

  // const { isLoading, data } = useRequestProcessor().query(
  //   ['admin', 'user', `id: ${id}`],
  //   async () => await CertificateService.GetById(id ?? ''),
  //   {
  //     enabled: !!id,
  //   },
  // );

  // const { mutate: showDocumentPicture, isLoading: isLoadingPicture } = useMutation<
  //   IShowDocumentImageResponse,
  //   Error,
  //   string
  // >((id: string) => AdminService.GetDocPicById(id));

  // const handleShowDocumentPicture = ({ id }: { id: string }) => {
  //   showDocumentPicture(id, {
  //     onSuccess: (data: IShowDocumentImageResponse) => {
  //       setImageBuffer(data.buffer);
  //     },
  //     onError: (error: any) => {
  //       toast.error(`${error}`);
  //     },
  //   });
  // };

  // const { mutate: updateUserInfo } = useMutation<unknown, Error, IUpdateUserInfo>(
  //   ({ userToUpdateId, status }) => AdminService.UpdateUserStatus({ userToUpdateId, status }),
  // );

  // const handleApproveUser = (status: string) => {
  //   updateUserInfo(
  //     { userToUpdateId: id ?? '', status: status },
  //     {
  //       onSuccess: () => {
  //         navigate(buildAdminPageUrl({ status: status, userId: id }));
  //       },
  //       onError: (error: any) => {
  //         toast.error(`${error}`);
  //       },
  //     },
  //   );
  // };

  // if (isLoading || !data || !id) {
  return (
    <ApplicationLayout icon={FileBadgeIcon} title="Carregando...">
      <p>Carregando ...</p>
    </ApplicationLayout>
  );
  // }

  // return (
  //   <ApplicationLayout icon={UserIcon} title="" hideCredits>
  //     <BackButton href={buildCertificatesPageUrl()}>Voltar para Meus Usuários</BackButton>
  //     <div className="mb-48 flex-col rounded-xl border border-slate-200 bg-white">
  //       <header className="flex w-full flex-col justify-between gap-4 rounded-t-xl border-b border-slate-200 bg-slate-50 p-6 lg:flex-row lg:items-center">
  //         <div className="inline-flex items-center gap-6">
  //           <h2 className="text-lg font-bold md:text-3xl">{data.name}</h2>
  //         </div>
  //       </header>
  //       <div className="flex flex-col gap-8 p-6 md:p-12">
  //         <div className="grid grid-cols-12 gap-8">
  //           <GridItem icon={UserIcon} title="Emitido para">
  //             {data.receptorName}
  //           </GridItem>
  //           <GridItem icon={Clock9Icon} title="Carga horária">
  //             {data.hoursWorkload}h
  //           </GridItem>
  //           <GridItem icon={CalendarFoldIcon} title="Emissão">
  //             {data.issuedAt}
  //           </GridItem>
  //           <GridItem icon={BookKeyIcon} title="Blockchain">
  //             <Badge className="uppercase" variant={data.blockchain ? 'success' : 'destructive'}>
  //               {data.blockchain ? 'Possui' : 'Não possui'}
  //             </Badge>
  //           </GridItem>
  //           <GridItem icon={AwardIcon} title="Open Badge">
  //             <Badge className="uppercase" variant={data.openBadge ? 'success' : 'destructive'}>
  //               {data.openBadge ? 'Possui' : 'Não possui'}
  //             </Badge>
  //           </GridItem>
  //         </div>
  //         <div className="flex flex-col gap-1">
  //           <h3 className="text-xs font-bold uppercase text-slate-600">Descrição</h3>
  //           <p className="font-normal">{data.description ?? 'Sem descrição'}</p>
  //         </div>
  //         <hr className="border-dashed" />
  //       </div>
  //     </div>
  //   </ApplicationLayout>
  // );
}

// function GridItem({
//   title,
//   children,
//   className,
//   ...props
// }: Readonly<{
//   icon: LucideIcon;
//   title: string;
//   className?: string;
//   children?: React.ReactNode;
// }>) {
//   return (
//     <div className={cn('col-span-5 flex flex-col gap-2 lg:col-span-3', className)}>
//       <div className="inline-flex gap-2">
//         <props.icon className="size-4 text-slate-400" />
//         <div className="flex flex-col gap-1">
//           <h3 className="text-xs font-bold uppercase text-slate-600">{title}</h3>
//           <p className="font-normal">{children}</p>
//         </div>
//       </div>
//     </div>
//   );
// }
