export function CheckDateRange(startDate: string, endDate: string) {
  const [startDay, startMonth, startYear] = startDate.split('/').map((part) => parseInt(part, 10));
  const [endDay, endMonth, endYear] = endDate.split('/').map((part) => parseInt(part, 10));

  if (endYear > startYear) {
    return true;
  } else if (endYear === startYear) {
    if (endMonth > startMonth) {
      return true;
    } else if (endMonth === startMonth) {
      if (endDay >= startDay) {
        return true;
      }
    }
  }

  return false;
}
