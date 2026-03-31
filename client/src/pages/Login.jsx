import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { login, user } = useAuth(); // 👈 include user for debugging
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("🚀 Login attempt:", { email });

    try {
      // 🔑 Attempt login
      await login({ email, password });

      console.log("✅ Login successful");

      // 🧠 Check if user is set (important)
      console.log("👤 User after login:", user);

      // 🚀 Navigate to dashboard
      console.log("➡️ Navigating to /dashboard");
      navigate('/dashboard');

    } catch (err) {
      console.error("❌ Login failed:", err);
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
        Don't have an account? <Link to="/register">Register</Link>
      </p>

      {message && <p>{message}</p>}
    </div>
  );
}