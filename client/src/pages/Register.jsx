import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Register() {
  const { register } = useAuth(); // ✅ use context
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await register(form); // ✅ matches { email, password }

      // 🚀 redirect after success
      navigate('/dashboard');

    } catch (err) {
      setMessage(err.message || 'Registration failed ❌');
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>

      {message && <p>{message}</p>}
    </div>
  );
}