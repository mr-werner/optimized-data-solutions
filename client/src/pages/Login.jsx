import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth(); // ✅ use context
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login({ email, password }); // ✅ correct format

      // 🚀 SPA navigation (no reload)
      navigate('/dashboard');

    } catch (err) {
      setMessage(err.message || 'Login failed ❌');
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

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>
      Don't have an account? <a href="/register">Register</a>
      </p>

      {message && <p>{message}</p>}
    </div>
  );
}