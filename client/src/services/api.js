const BASE_URL = 'http://localhost:3000/api';

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  // Optional: handle errors globally
  if (!res.ok) {
    throw new Error('API request failed');
  }

  return res.json();
};