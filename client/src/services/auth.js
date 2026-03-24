import { apiFetch } from './api';

// 🔑 LOGIN (now also saves token automatically)
export async function login(email, password) {
  const data = await apiFetch('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  // 💾 store token here (centralized)
  localStorage.setItem('token', data.token);

  return data;
}

// 🔐 Protected request
export const getProtectedData = async () => {
  return apiFetch('/protected');
};

// 🚪 Logout
export const logout = () => {
  localStorage.removeItem('token');
};

// 🔍 Optional helpers (still useful elsewhere)
export function getToken() {
  return localStorage.getItem('token');
}