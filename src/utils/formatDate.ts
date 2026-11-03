const formatter = new Intl.DateTimeFormat('es-CR', { dateStyle: 'medium' });

export const formatDate = (isoDate: string): string =>
  formatter.format(new Date(isoDate));