import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import ProductList from './pages/ProductList/ProductList';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Profile from './pages/Profile/Profile';
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import Item from './pages/Item/Item';
import ReceiptPage from './pages/Receipt/Receipt';
import ProfileDetails from './pages/ProfileDetails/ProfileDetails';

const Placeholder: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '60px 0' }}>
    <h1>Page Under Construction</h1>
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
        <NavBar/>
      <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<Item />} />
          <Route path="/receipt/:id" element={<ReceiptPage />} />
          <Route path="/profile/details" element={<ProfileDetails />} />
        </Routes>
      </div>
        <Footer/>
    </BrowserRouter>
  );
};

export default App;