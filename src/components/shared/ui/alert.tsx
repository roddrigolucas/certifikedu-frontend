import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';

const alertVariants = cva(
  'relative min-h-12 w-full rounded-lg border p-3 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'border border-slate-200 bg-slate-50 text-foreground',
        info: 'border border-slate-200 bg-blue-zodiac-50 text-foreground',
        warning: 'border-yellow-100 bg-yellow-50 text-yellow-950  [&>svg]:text-yellow-950',
        destructive: 'border-red-100 bg-red-50 text-red-950  [&>svg]:text-red-950',
        success: 'border-emerald-100 bg-emerald-50 text-emerald-950  [&>svg]:text-emerald-950',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-semibold text-sm leading-none tracking-tight', className)}
      {...props}
    />
  ),
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
