import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import ProductList from './ProductList';
import Register from './Register';
import Login from './Login';
import Cart from './Cart';
import Checkout from './Checkout';
import Profile from './Profile';

function Placeholder() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 0' }}>
      <h1>Page Under Construction</h1>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
