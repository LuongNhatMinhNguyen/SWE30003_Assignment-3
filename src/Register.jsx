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

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const updatedForm = { ...form, [e.target.name]: e.target.value };
    console.log('Updated form state:', updatedForm); // Debug: Log state updates
    setForm(updatedForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with values:', form); // Debug: Log form values
    // Basic validation
    if (!form.name || !form.email || !form.password || !form.address) {
      console.log('Validation failed: Some fields are empty'); // Debug: Log validation failure
      alert('Please fill in all fields');
      return;
    }
    // Simulate registration (log to console)
    console.log('Registered user:', form);
    // Show success message
    setSuccess(true);
    // Redirect to login after a short delay
    setTimeout(() => {
      console.log('Navigating to /login'); // Debug: Confirm navigation
      navigate('/login');
    }, 1000); // 1-second delay to show success message
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
          onMouseOver={(e) => (e.target.style.background = '#0056b3')}
          onMouseOut={(e) => (e.target.style.background = '#007bff')}
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
          onMouseOver={(e) => (e.target.style.background = '#444')}
          onMouseOut={(e) => (e.target.style.background = '#666')}
        >
          Back to Home
        </Link>
      </form>
    </div>
  );
};

export default Register;