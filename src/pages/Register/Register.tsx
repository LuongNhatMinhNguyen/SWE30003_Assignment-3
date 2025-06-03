import './Register.css';
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
    city: '',
    postcode: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all required fields');
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
      form.address,
      form.city,
      form.postcode,
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
    <div className="register-container">
  <form onSubmit={handleSubmit} className="register-form">
    <h2 style={{ marginBottom: 24, color: '#1976d2' }}>Register</h2>

    {success && <p style={{ color: 'green', marginBottom: '16px' }}>Registration successful! Redirecting to login...</p>}
    {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}

    <label className="register-label" htmlFor="name">Name</label>
    <input className="register-input" id="name" name="name" type="text" placeholder="Enter your name" value={form.name} onChange={handleChange} />

    <label className="register-label" htmlFor="email">Email</label>
    <input className="register-input" id="email" name="email" type="email" placeholder="Enter your email" value={form.email} onChange={handleChange} />

    <label className="register-label" htmlFor="password">Password</label>
    <input className="register-input" id="password" name="password" type="password" placeholder="Enter your password" value={form.password} onChange={handleChange} />

    <label className="register-label" htmlFor="address">Address</label>
    <input className="register-input" id="address" name="address" type="text" placeholder="Enter your address (optional)" value={form.address} onChange={handleChange} />

    <label className="register-label" htmlFor="city">City</label>
    <input className="register-input" id="city" name="city" type="text" placeholder="Enter your city (optional)" value={form.city} onChange={handleChange} />

    <label className="register-label" htmlFor="postcode">Postcode</label>
    <input className="register-input" id="postcode" name="postcode" type="text" placeholder="Enter your postcode (optional)" value={form.postcode} onChange={handleChange} />

    <button type="submit" className="register-button">Register</button>

    <Link to="/" className="back-button">Back to Home</Link>
  </form>
</div>

  );
};

export default Register;