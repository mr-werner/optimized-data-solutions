import React from 'react';
import { useEffect, useState } from 'react';
import { getProtectedData, logout } from '../services/auth';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProtectedData();
        setData(res);
      } catch (err) {
        setError('Access denied ❌');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '50px' }}>
      <h1>Dashboard</h1>
      <p>You are successfully logged in 🎉</p>

      {data && (
        <div>
          <h2>Welcome, {data.user.email} 👋</h2>
          <p>User ID: {data.user.id}</p>
          <p>Company ID: {data.user.companyId}</p>
        </div>
      )}

      {error && <p>{error}</p>}

      <button
        onClick={() => {
          logout();
          window.location.href = '/';
        }}
        style={{ marginTop: '20px' }}
      >
        Logout
      </button>
    </div>
  );
}