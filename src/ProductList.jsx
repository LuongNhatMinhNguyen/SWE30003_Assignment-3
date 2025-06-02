import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch products
  useEffect(() => {
    fetch('/products.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load products');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  // Get unique categories
  const categories = [
    'All Categories',
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  // Filter products
  const filtered = products.filter((p) => {
    const matchesCategory =
      category === 'All Categories' || p.category === category;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
      <div style={{ width: '100%', maxWidth: 900, marginBottom: 24 }}>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            marginBottom: 20,
            background: '#007bff',
            color: '#fff',
            padding: '10px 24px',
            border: 'none',
            borderRadius: 6,
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            transition: 'background 0.2s',
          }}
          onMouseOver={e => (e.target.style.background = '#0056b3')}
          onMouseOut={e => (e.target.style.background = '#007bff')}
        >
          Back to Home
        </Link>
        <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: 300,
              padding: 8,
              borderRadius: 4,
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{
              padding: 8,
              borderRadius: 4,
              border: '1px solid #ccc',
              fontSize: '1rem',
              minWidth: 160,
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      {loading ? (
        <div style={{ fontSize: '1.2rem', color: '#333', marginTop: 40 }}>Loading products...</div>
      ) : error ? (
        <div style={{ fontSize: '1.2rem', color: 'red', marginTop: 40 }}>{error}</div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 24,
            width: '100%',
            maxWidth: 900,
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#555' }}>
              No products found.
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                style={{
                  border: '1px solid gray',
                  borderRadius: 8,
                  padding: 10,
                  background: '#fff',
                  width: 200,
                  boxSizing: 'border-box',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  fontWeight: 500,
                  fontSize: '1.1rem',
                  color: '#000',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ marginBottom: 8 }}>{product.name}</div>
                <div style={{ color: '#1976d2', marginBottom: 4 }}>
                  ${product.price.toFixed(2)}
                </div>
                <div style={{ fontSize: '0.95rem', color: '#444' }}>
                  ({product.stock} in stock)
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;