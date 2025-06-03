import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Customer } from '../../models/Customer';
import { v4 as uuidv4 } from 'uuid'; // For unique customer IDs (install with npm i uuid @types/uuid)

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

const Register: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.address) {
      setError('Please fill in all fields');
      return;
    }

    // Get users from localStorage 
    const users: Customer[] = JSON.parse(localStorage.getItem('awe_users') || '[]');
    // Check if email already exists
    const exists = users.some(u => u.email === form.email);
    if (exists) {
      setError('An account with this email already exists.');
      return;
    }

    // Create new Customer object 
    const newCustomer = new Customer(
      uuidv4(),
      form.name,
      form.email,
      form.password,
      form.address
    );
    
    // Add new user and save
    users.push(newCustomer);
    localStorage.setItem('awe_users', JSON.stringify(users));
    setSuccess(true);
    setError('');
    setTimeout(() => {
      navigate('/login');
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
        <h2 style={{ marginBottom: 24, color: '#1976d2' }}>Register</h2>
        {success && (
          <p style={{ color: 'green', marginBottom: '16px' }}>
            Registration successful! Redirecting to login...
          </p>
        )}
        {error && (
          <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>
        )}
        <label style={labelStyle} htmlFor="name">Name</label>
        <input
          style={inputStyle}
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
        />
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
        <label style={labelStyle} htmlFor="address">Address</label>
        <input
          style={inputStyle}
          id="address"
          name="address"
          type="text"
          placeholder="Enter your address"
          value={form.address}
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
          onMouseOver={(e) => (e.currentTarget.style.background = '#0056b3')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#007bff')}
        >
          Register
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
          onMouseOver={(e) => (e.currentTarget.style.background = '#444')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#666')}
        >
          Back to Home
        </Link>
      </form>
    </div>
  );
};

export default Register;