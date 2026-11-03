import Cookies from 'js-cookie';

const TOKEN_KEY = 'task_manager_token';

export const saveSessionToken = (token: string, expiresInDays = 1): void => {
  Cookies.set(TOKEN_KEY, token, {
    expires: expiresInDays,
    sameSite: 'strict',
    secure: window.location.protocol === 'https:',
  });
};

export const getSessionToken = (): string | undefined => Cookies.get(TOKEN_KEY);

export const removeSessionToken = (): void => {
  Cookies.remove(TOKEN_KEY);
};