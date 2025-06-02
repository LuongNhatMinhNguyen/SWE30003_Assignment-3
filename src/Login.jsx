import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const inputStyle = {
  width: '300px',
  padding: '10px',
  border: '1px solid gray',
  borderRadius: '4px',
  margin: '10px 0',
  fontSize: '1rem',
};

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontWeight: 500,
  color: '#222',
};

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please enter both email and password');
      return;
    }

    console.log('Login attempt:', form);
    setSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          padding: '32px 28px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: '340px',
        }}
      >
        <h2 style={{ marginBottom: 24, color: '#1976d2' }}>Login</h2>
        {success && (
          <p style={{ color: 'green', marginBottom: '16px' }}>
            Login successful! Redirecting to home...
          </p>
        )}
        {error && (
          <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>
        )}
        <label style={labelStyle} htmlFor="email">Email</label>
        <input
          style={inputStyle}
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
        />
        <label style={labelStyle} htmlFor="password">Password</label>
        <input
          style={inputStyle}
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          style={{
            marginTop: '18px',
            background: '#007bff',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseOver={e => (e.target.style.background = '#0056b3')}
          onMouseOut={e => (e.target.style.background = '#007bff')}
        >
          Login
        </button>
        <Link
          to="/"
          style={{
            marginTop: '16px',
            display: 'inline-block',
            background: '#666',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
            textDecoration: 'none',
            fontWeight: 500,
            transition: 'background 0.2s',
          }}
          onMouseOver={e => (e.target.style.background = '#444')}
          onMouseOut={e => (e.target.style.background = '#666')}
        >
          Back to Home
        </Link>
      </form>
    </div>
  );
};

export default Login;