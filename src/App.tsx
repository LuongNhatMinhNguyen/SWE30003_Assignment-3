import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import ProductList from './pages/ProductList/ProductList';
import Register from './pages/Register';
import Login from './pages/Login/Login';
import Cart from './pages/Cart/Cart';
import Checkout from './Checkout';
import Profile from './Profile';
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import Item from './pages/Item/Item';

const Placeholder: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '60px 0' }}>
    <h1>Page Under Construction</h1>
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<Item />} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
};

export default App;
// Finished Testing 1st version of the app