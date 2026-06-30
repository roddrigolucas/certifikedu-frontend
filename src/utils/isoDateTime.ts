export function ConvertToISODateTime(dateString: string, timeString: string): string {
  if (!timeString) {
    timeString = '00:00';
  }
  let [day, month, year] = dateString.split('/').map((part) => parseInt(part, 10));
  let [hours, minutes] = timeString.split(':').map((part) => parseInt(part, 10));

  hours += 3; // UTC

  if (hours >= 24) {
    hours -= 24;
    day += 1;

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth) {
      day = 1;
      month += 1;

      if (month > 12) {
        month = 1;
        year += 1;
      }
    }
  }

  const date = new Date(Date.UTC(year, month - 1, day, hours, minutes));

  return date.toISOString();
}

export function ConvertFromISODateTime(isoDateTime: string): { date: string; time: string } {
  try {
    let dt = new Date(isoDateTime);
    if (isNaN(dt.getTime())) {
      return { date: '', time: '' };
    }

    const date = dt.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const time = dt.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    return { date, time };
  } catch (error) {
    return { date: '', time: '' };
  }
}
