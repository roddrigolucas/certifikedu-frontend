import { LucideIcon } from 'lucide-react';

import { Progress } from '@/components/shared/ui/progress';

import { cn } from '@/utils';

interface IStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface StepProps extends IStep {
  active?: boolean;
}
interface StepperProps {
  steps: Array<IStep>;
  currentStep: number;
}

export function Step({ title, description, active = false, ...props }: Readonly<StepProps>) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-2 z-10')}>
      <div
        className={cn('size-12 rounded-lg border items-center justify-center inline-flex', {
          'bg-orange-50 border-orange-200': active,
          'bg-white border-slate-200': !active,
        })}
      >
        <props.icon
          className={cn('size-7', {
            'text-orange-500': active,
            'text-slate-600 opacity-50': !active,
          })}
        />
      </div>
      <div
        className={cn('flex flex-col text-center', {
          'opacity-50': !active,
        })}
      >
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}

export function Stepper({ steps, currentStep }: Readonly<StepperProps>) {
  const getValueProgress = () => {
    if (currentStep === 0) {
      return 0;
    }

    if (currentStep >= steps.length - 1) {
      return 100;
    }

    return ((currentStep + 1) / steps.length) * 100 - 8;
  };

  return (
    <div className="relative inline-flex w-full gap-8">
      <Progress
        value={getValueProgress()}
        className="absolute left-1/2 top-[25%] hidden w-[calc(100%_-_8rem)] -translate-x-1/2 -translate-y-1/2 lg:block"
      />
      <div className="flex w-full flex-col gap-4 md:justify-between lg:flex-row">
        {steps.map((step, index) => (
          <Step key={step.title} {...step} active={currentStep >= index} />
        ))}
      </div>
    </div>
  );
}
