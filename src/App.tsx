import { useEffect, useState } from 'react';
import { getErrorMessage } from '@/services/apiError';
import { doGet } from '@/services/http.service';

export const App = () => {
  const [message, setMessage] = useState('Consultando…');

  useEffect(() => {
    doGet<unknown>('/api/tasks')
      .then(() => setMessage('Respuesta correcta'))
      .catch((error: unknown) => setMessage(getErrorMessage(error)));
  }, []);

  return <p>{message}</p>;
};