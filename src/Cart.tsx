import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Product } from './models/Product';
import { Order, OrderItem } from './models/Order';
import { Receipt } from './models/Receipt';

interface CartItem {
  productId: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const storedCart: CartItem[] = JSON.parse(localStorage.getItem('awe_cart') || '[]');
    setCart(storedCart);
  }, []);

  // Fetch products
  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then((data) => setProducts(data as Product[]))
      .catch(() => setError('Failed to load products'));
  }, []);

  //  Get product details by id
  const getProduct = (id: string) => products.find(p => p.id === id);

  // Update cart in localStorage and state
  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('awe_cart', JSON.stringify(newCart));
  };

  // Change quantity
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

  // Remove item
  const handleRemove = (productId: string) => {
    const newCart = cart.filter(i => i.productId !== productId);
    updateCart(newCart);
  };

  // Calculate total
  const total = cart.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);

  // Proceed to checkout
  const handleCheckout = () => {
    // order creation
    const users = JSON.parse(localStorage.getItem('awe_users') || '[]');
    const loggedInEmail = localStorage.getItem('awe_logged_in');
    const customer = users.find((u: any) => u.email === loggedInEmail);

    // 1. Create Order
    const order = new Order(
      uuidv4(),
      customer ? customer.id || customer.email : 'guest',
      cart.map(item => new OrderItem(item.productId, item.quantity)),
      total,
      new Date().toISOString()
    );
    const orders: Order[] = JSON.parse(localStorage.getItem('awe_orders') || '[]');
    orders.push(order);
    localStorage.setItem('awe_orders', JSON.stringify(orders));

    // 2. Create Receipt
    const receipt = new Receipt(
      uuidv4(),
      order.id,
      order.total,
      order.date,
      order.customerId
    );
    const receipts: Receipt[] = JSON.parse(localStorage.getItem('awe_receipts') || '[]');
    receipts.push(receipt);
    localStorage.setItem('awe_receipts', JSON.stringify(receipts));

    // Clear cart after checkout
    localStorage.setItem('awe_cart', '[]');
    setCart([]);

    // Log for assignment requirements
    console.log('Order placed:', order);
    console.log('Receipt created:', receipt);

    // Navigate to checkout page
    navigate('/checkout');
  };

  // Render
  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>{error}</div>;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f5f5f5',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2 style={{ marginBottom: 24, color: '#000' }}>Your Cart</h2>
      <Link
        to="/products"
        style={{
          marginBottom: 20,
          background: '#007bff',
          color: '#fff',
          padding: '10px 24px',
          borderRadius: 6,
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          transition: 'background 0.2s',
        }}
        onMouseOver={e => (e.currentTarget.style.background = '#0056b3')}
        onMouseOut={e => (e.currentTarget.style.background = '#007bff')}
      >
        Continue Shopping
      </Link>
      {cart.length === 0 ? (
        <div style={{ color: '#555', marginTop: 40 }}>Your cart is empty</div>
      ) : (
        <div style={{ width: '100%', maxWidth: 700 }}>
          {cart.map(item => {
            const product = getProduct(item.productId);
            if (!product) return null;
            return (
              <div
                key={item.productId}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: 8,
                  padding: 16,
                  marginBottom: 16,
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: '#000' }}>{product.name}</div>
                  <div style={{ color: '#000' }}>${product.price.toFixed(2)}</div>
                  <div style={{ fontSize: '0.95rem', color: '#000' }}>
                    In stock: {product.stock}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={() => handleQuantity(item.productId, -1)}
                    disabled={item.quantity <= 1}
                    style={{
                      padding: '4px 10px',
                      fontSize: '1.2rem',
                      borderRadius: 4,
                      border: '1px solid #ccc',
                      background: '#eee',
                      color: '#000',
                      cursor: item.quantity > 1 ? 'pointer' : 'not-allowed',
                    }}
                  >-</button>
                  <span style={{ color: '#000', fontWeight: 600 }}>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantity(item.productId, 1)}
                    disabled={item.quantity >= product.stock}
                    style={{
                      padding: '4px 10px',
                      fontSize: '1.2rem',
                      borderRadius: 4,
                      border: '1px solid #ccc',
                      background: '#eee',
                      color: '#000',
                      cursor: item.quantity < product.stock ? 'pointer' : 'not-allowed',
                    }}
                  >+</button>
                  <button
                    onClick={() => handleRemove(item.productId)}
                    style={{
                      marginLeft: 16,
                      background: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 4,
                      padding: '6px 14px',
                      cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                </div>
                <div style={{ fontWeight: 500, color: '#000' }}>
                  ${(product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            );
          })}
          <div style={{ textAlign: 'right', marginTop: 24, fontSize: '1.2rem', fontWeight: 600, color: '#000' }}>
            Total: ${total.toFixed(2)}
          </div>
          <button
            onClick={handleCheckout}
            style={{
              marginTop: 24,
              background: '#007bff',
              color: '#fff',
              padding: '12px 32px',
              border: 'none',
              borderRadius: 6,
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.background = '#0056b3')}
            onMouseOut={e => (e.currentTarget.style.background = '#007bff')}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;