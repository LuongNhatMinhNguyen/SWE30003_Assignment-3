// Cart.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../../models/Product';
import { Order, OrderItem } from '../../models/Order';
import { Receipt } from '../../models/Receipt';
import './Cart.css';

interface CartItem {
  productId: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart: CartItem[] = JSON.parse(localStorage.getItem('awe_cart') || '[]');
    setCart(storedCart);
  }, []);

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then((data) => setProducts(data as Product[]))
      .catch(() => setError('Failed to load products'));
  }, []);

  const getProduct = (id: string) => products.find(p => p.id === id);

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('awe_cart', JSON.stringify(newCart));
  };

  const handleQuantity = (productId: string, delta: number) => {
    const product = getProduct(productId);
    if (!product) return;
    const item = cart.find(i => i.productId === productId);
    let newQty = (item?.quantity || 0) + delta;
    if (newQty < 1) newQty = 1;
    if (newQty > product.stock) newQty = product.stock;
    const newCart = cart.map(i =>
      i.productId === productId ? { ...i, quantity: newQty } : i
    );
    updateCart(newCart);
  };

  const handleRemove = (productId: string) => {
    const newCart = cart.filter(i => i.productId !== productId);
    updateCart(newCart);
  };

  const total = cart.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);

  const handleCheckout = () => {
    navigate('/checkout', { 
      state: {
        cart,
        total
      } });
  };

  if (error) {
    return <div className="cart-error">{error}</div>;
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <Link to="/products" className="continue-shopping">Continue Shopping</Link>
      {cart.length === 0 ? (
        <div className="empty-cart">Your cart is empty</div>
      ) : (
        <div className="cart-items">
          {cart.map(item => {
            const product = getProduct(item.productId);
            if (!product) return null;
            return (
              <div key={item.productId} className="cart-item">
                <div>
                  <div className="product-name">{product.name}</div>
                  <div className="product-price">${product.price.toFixed(2)}</div>
                  <div className="product-stock">In stock: {product.stock}</div>
                </div>
                <div className="cart-actions">
                  <button onClick={() => handleQuantity(item.productId, -1)} disabled={item.quantity <= 1}>-</button>
                  <span className='item-quantity'>{item.quantity}</span>
                  <button onClick={() => handleQuantity(item.productId, 1)} disabled={item.quantity >= product.stock}>+</button>
                  <button onClick={() => handleRemove(item.productId)} className="remove-button">Remove</button>
                </div>
                <div className="item-total">${(product.price * item.quantity).toFixed(2)}</div>
              </div>
            );
          })}
          <div className="cart-total">Total: ${total.toFixed(2)}</div>
          <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
