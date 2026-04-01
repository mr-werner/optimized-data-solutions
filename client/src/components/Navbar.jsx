import React from 'react';
import { useState } from 'react';
import Modal from './Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState('login');

  return (
    <nav className="nav">
      <div className="logo">ODS</div>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/services">Services</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>

      <div className="auth">
        <button
          className="btn-outline"
          onClick={() => {
            setMode('login');
            setShowModal(true);
          }}
        >
          Login
        </button>

        <button
          className="btn"
          onClick={() => {
            setMode('register');
            setShowModal(true);
          }}
        >
          Register
        </button>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {mode === 'login' ? (
          <LoginForm onSuccess={() => setShowModal(false)} />
        ) : (
          <RegisterForm onSuccess={() => setShowModal(false)} />
        )}
      </Modal>
    </nav>
  );
}