import React from 'react';


export default function LoginForm({ onSuccess }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    // your login logic here

    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button type="submit">Login</button>
    </form>
  );
}