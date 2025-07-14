export function formatDate(dateString?: string) {
  if (!dateString) {
    return 'Sin Fecha';
  }
  const date = new Date(dateString);

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return dateFormatter.format(date);
}

export function formatDatetimeDBFromMiliseconds(timestamp: number) {
  const date = new Date(timestamp);

  const parts = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Bogota', // Ajusta a tu zona horaria si es necesario
  }).formatToParts(date);

  const getPart = (type: string) => parts.find(p => p.type === type)?.value;

  return `${getPart('year')}-${getPart('month')}-${getPart('day')}T${getPart(
    'hour'
  )}:${getPart('minute')}`;
}
