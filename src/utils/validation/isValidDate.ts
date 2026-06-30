import { isValid, parse } from 'date-fns';

export const isValidDate = (val: string) => {
  const parsedDate = parse(val, 'dd/MM/yyyy', new Date());

  const isTimestamp = isValid(new Date(parsedDate));

  return isTimestamp;
};
