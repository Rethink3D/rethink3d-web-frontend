
export function parseBackendDate(dateStr: string | undefined | null): Date {
  if (!dateStr) return new Date();

  
  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) {
    return date;
  }

  
  const brMatch = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (brMatch) {
    const [, day, month, year] = brMatch;
    
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }

  return new Date();
}
