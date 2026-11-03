import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { SessionExpiredError } from './apiError';
import { getSessionToken, removeSessionToken } from './cookies.service';

const configuredUrl: unknown = import.meta.env.VITE_API_URL;
const baseURL =
  typeof configuredUrl === 'string' ? configuredUrl : 'http://localhost:8080';

type UnauthorizedHandler = () => void;

let unauthorizedHandler: UnauthorizedHandler | null = null;

// El servicio no conoce a React: quien lo necesite registra qué hacer ante un 401
export const setUnauthorizedHandler = (
  handler: UnauthorizedHandler | null,
): void => {
  unauthorizedHandler = handler;
};

const apiInstance: AxiosInstance = axios.create({ baseURL });

apiInstance.interceptors.request.use((config) => {
  const token = getSessionToken();
  if (token !== undefined) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const hadSession = getSessionToken() !== undefined;
    if (axios.isAxiosError(error) && error.response?.status === 401 && hadSession) {
      removeSessionToken();
      unauthorizedHandler?.();
      return Promise.reject(new SessionExpiredError());
    }
    return Promise.reject(error);
  },
);

export const doGet = async <R>(path: string): Promise<R> => {
  const response = await apiInstance.get<R>(path);
  return response.data;
};

export const doPost = async <I, R>(path: string, payload: I): Promise<R> => {
  const response = await apiInstance.post<R>(path, payload);
  return response.data;
};

export const doPatch = async <I, R>(path: string, payload: I): Promise<R> => {
  const response = await apiInstance.patch<R>(path, payload);
  return response.data;
};

export const doDelete = async (path: string): Promise<void> => {
  await apiInstance.delete(path);
};