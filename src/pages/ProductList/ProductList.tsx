import './ProductList.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

interface CartItem {
  productId: string;
  quantity: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/products.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load products');
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  const categories = [
    'All Categories',
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filtered = products.filter((p) => {
    const matchesCategory = category === 'All Categories' || p.category === category;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (productId: string) => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem('awe_cart') || '[]');
    const item = cart.find(i => i.productId === productId);
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (item) {
      if (item.quantity < product.stock) {
        item.quantity += 1;
      }
    } else {
      cart.push({ productId, quantity: 1 });
    }

    localStorage.setItem('awe_cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <div className="search-controls">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="status-message loading">Loading products...</div>
      ) : error ? (
        <div className="status-message error">{error}</div>
      ) : (
        <div className="products-grid">
          {filtered.length === 0 ? (
            <div className="no-products">No products found.</div>
          ) : (
            filtered.map((product) => (
              <div className="product-card" key={product.id}>
                <Link className="product-link" to={`/product/${product.id}`}>
                  <div className="name">{product.name}</div>
                </Link>
                <div className="">

                <Link className="product-link" to={`/product/${product.id}`}>
                  <img
                    src={`/images/${product.id}.webp`}
                    alt={product.name}
                    className="product-thumbnail"
                    />
                  <div className="price">${product.price.toFixed(2)}</div>
                  <div className="stock">({product.stock} in stock)</div>
                </Link>
                <button
                  className="add-button"
                  onClick={() => handleAddToCart(product.id)}
                  >
                  Add to Cart
                </button>
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