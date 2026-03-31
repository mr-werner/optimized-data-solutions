import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProtectedData, logout } from '../services/auth';

export default function Dashboard() {
  const { user } = useAuth(); // 🔥 use global user

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

      {/* ✅ Use context user safely */}
      <div>
        <h2>Welcome, {user?.email} 👋</h2>
        <p>User ID: {user?.id}</p>
      </div>

      {/* Optional: show protected data */}
      {data && (
        <div>
          <h3>Protected Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
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