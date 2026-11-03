import axios from 'axios';

// Se lanza cuando el servidor rechaza una sesión que existía (token vencido)
export class SessionExpiredError extends Error {
  constructor() {
    super('Sesión expirada');
    this.name = 'SessionExpiredError';
  }
}

const hasMessage = (value: unknown): value is { message: string } =>
  typeof value === 'object' &&
  value !== null &&
  'message' in value &&
  typeof value.message === 'string';

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data: unknown = error.response?.data;
    if (hasMessage(data)) return data.message;
    if (error.response === undefined) return 'No se pudo conectar con el servidor';
    return `Error del servidor (${error.response.status})`;
  }
  return error instanceof Error ? error.message : 'Error desconocido';
};