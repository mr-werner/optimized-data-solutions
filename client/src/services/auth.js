import { apiRequest } from './api';

// 🆕 Register
export async function register({ email, password }) {
  const data = await apiRequest('/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  // Store JWT
  localStorage.setItem('token', data.token);

  return data;
}

// 🔑 Login
export async function login({ email, password }) {
  const data = await apiRequest('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  // Store JWT
  localStorage.setItem('token', data.token);

  return data;
}

// 👤 Get current user
export async function getMe() {
  return apiRequest('/me');
}

// 🚪 Logout
export function logout() {
  localStorage.removeItem('token');
}

// 🔍 Helper
export function getToken() {
  return localStorage.getItem('token');
}

export async function getProtectedData() {
  return apiRequest('/me');
}

