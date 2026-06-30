import type { TitleProps } from './types';

export const Title = ({ children }: TitleProps) => {
  return <h2 className="text-2xl font-bold md:text-4xl">{children}</h2>;
};
