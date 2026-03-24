import { apiFetch } from './api';

export const login = async (email) => {
  const data = await apiFetch('/login', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

  localStorage.setItem('token', data.token);
  return data;
};

export const getProtectedData = async () => {
  return apiFetch('/protected');
};

export const logout = () => {
  localStorage.removeItem('token');
};