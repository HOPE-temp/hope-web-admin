export function formatDate(dateString?: string){
  if(!dateString){
    return 'Sin Fecha'
  }
  const date = new Date(dateString);

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return  dateFormatter.format(date);
}