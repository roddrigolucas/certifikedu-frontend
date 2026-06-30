import * as React from 'react';

import { FileBadge2, Notebook, School } from 'lucide-react';
import { PuffLoader } from 'react-spinners';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/shared/ui/navigation-menu';

import useProfile from '@/hooks/core/useProfile';

import { cn } from '@/utils';

import { CloneTemplateDialog } from '../Dialogs/CloneTemplateDialog';
import { DeleteTemplateDialog } from '../Dialogs/DeleteTemplateDialog';
import { components } from './constants';

interface INavigationMenu {
  handleSubmit: (value: string) => void;
  data: {
    school: string;
    course: string;
    name: string;
    isLoading: boolean;
    templateId: string;
    quantity: number;
  };
}

export function NavigationMenuTemplate({ handleSubmit, data }: INavigationMenu) {
  const deleteDialogRef = React.useRef<{ openDialog: () => void }>(null);
  const cloneDialogRef = React.useRef<{ openDialog: () => void }>(null);
  const { isCanvas } = useProfile();

  return (
    <>
      <div className="flex flex-row gap-4">
        <NavigationMenu className="rounded-lg border border-slate-200">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger data-testId="emission-nav">
                <strong>Emitir</strong>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[330px] gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <div>
                      <a className="flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-3 no-underline outline-none focus:shadow-md">
                        <FileBadge2 className="size-6" />
                        <div className="mb-2 text-lg font-medium">CertifikEDU</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Emita certificados de conclusão para seus alunos.
                        </p>
                      </a>
                    </div>
                  </li>
                  <ListItem
                    icon={<School size={15} />}
                    onClick={() => handleSubmit('school')}
                    title="Emitir para Instituição"
                    data-testId="students-button"
                    disabled={!!isCanvas}
                  >
                    Selecione os alunos da instituição{' '}
                    <span className="font-bold">{data.school}</span> para emissão
                  </ListItem>
                  <ListItem
                    icon={<Notebook size={15} />}
                    onClick={() => {
                      data?.course ? handleSubmit('course') : null;
                    }}
                    title="Emitir para Curso"
                    disabled={!!!data.course}
                  >
                    {!!data.course ? (
                      <>
                        Selecione os alunos do curso <strong> {data.course}</strong> para emissão
                      </>
                    ) : (
                      <strong>Certificado sem curso associado</strong>
                    )}
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger data-testId="certificate-nav">
                <strong>Modificar</strong>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem
                      onClick={(e) => {
                        e.preventDefault();
                        if (component.title === 'Apagar') {
                          deleteDialogRef?.current?.openDialog();
                        } else if (component.title === 'Clonar') {
                          cloneDialogRef?.current?.openDialog();
                        } else if (data.quantity === 0) {
                          handleSubmit(component.onClickPath ?? '');
                        }
                      }}
                      disabled={
                        component.title === 'Editar'
                          ? data.quantity === 0
                            ? false
                            : true
                          : component.disabled ?? false
                      }
                      icon={component.icon}
                      key={component.title}
                      title={component.title}
                      data-testId={`${component.title}-button`}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div>{data.isLoading && <PuffLoader color="blue" size={32} />}</div>
      </div>
      <DeleteTemplateDialog
        ref={deleteDialogRef}
        templateName={data.name}
        templateId={data.templateId}
      >
        <></>
      </DeleteTemplateDialog>
      <CloneTemplateDialog
        ref={cloneDialogRef}
        templateName={data.name}
        templateId={data.templateId}
      >
        <></>
      </CloneTemplateDialog>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { disabled?: boolean; icon: React.ReactNode }
>(({ className, title, children, disabled, icon, ...props }, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block cursor-pointer select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
            disabled
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          onClick={handleClick}
          {...(disabled && { tabIndex: -1 })}
          {...props}
        >
          <div className="inline-flex items-center gap-2 text-sm font-medium leading-none">
            {icon}
            <p>{title}</p>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
