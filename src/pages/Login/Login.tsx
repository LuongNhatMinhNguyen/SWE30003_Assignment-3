import './Login.css';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Customer } from '../../models/Customer';

const inputStyle: React.CSSProperties = {
  width: '300px',
  padding: '10px',
  border: '1px solid gray',
  borderRadius: '4px',
  margin: '10px 0',
  fontSize: '1rem',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '6px',
  fontWeight: 500,
  color: '#222',
};

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users: Customer[] = JSON.parse(
      localStorage.getItem('awe_users') || '[]'
    );
    const user = users.find(
      (u) => u.email === form.email && u.password === form.password
    );
    if (user) {
      localStorage.setItem('awe_logged_in', form.email);
      setSuccess(true);
      setError('');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setError('Invalid email or password');
      setSuccess(false);
    }
  };

  return (
    <div className="login-container">
  <form onSubmit={handleLogin} className="login-form">
    <h2>Login</h2>
    {success && <p className="success-message">Login successful! Redirecting to home...</p>}
    {error && <p className="error-message">{error}</p>}
    
    <label className="input-label" htmlFor="email">Email</label>
    <input
      className="input-field"
      id="email"
      name="email"
      type="email"
      placeholder="Enter your email"
      value={form.email}
      onChange={handleChange}
    />
    
    <label className="input-label" htmlFor="password">Password</label>
    <input
      className="input-field"
      id="password"
      name="password"
      type="password"
      placeholder="Enter your password"
      value={form.password}
      onChange={handleChange}
    />
    
    <button type="submit" className="login-button">Login</button>
    <Link to="/" className="back-link">Back to Home</Link>
  </form>
</div>
  );
};

export default Login;