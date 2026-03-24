import React, { useState } from 'react';
import { login, getProtectedData } from '../services/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email);
      await testProtected();
      setMessage('Login successful ✅');
    } catch (err) {
      setMessage('Login failed ❌');
    }
  };

  // ✅ MOVE THIS OUTSIDE
  const testProtected = async () => {
    try {
      const data = await getProtectedData();
      console.log('Protected data:', data);
      setMessage('Protected route works 🔐');
    } catch (err) {
      console.error(err);
      setMessage('Access denied ❌');
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {/* ✅ ADD THIS BUTTON */}
      <button onClick={testProtected}>
        Test Protected Route
      </button>

      <p>{message}</p>
    </div>
  );
}