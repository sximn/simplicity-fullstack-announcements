export function formatDateTime({
  date,
  strategy = 'default',
}: {
  date: Date | string | number;
  strategy?: 'default' | 'without-time';
}): string {
  const d = new Date(date);

  const datePart = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(d);

  if (strategy === 'without-time') {
    return datePart;
  }

  const timePart = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24h format
  }).format(d);

  return `${datePart} ${timePart}`;
}
