import { CardProps } from './types';

export const Card = ({ children }: CardProps) => {
  return <div className="bg-lightest dark:bg-dark rounded-lg p-8">{children}</div>;
};
