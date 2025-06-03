import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../../models/Product';

// Sample data (can be replaced with props or fetched data)
const allProducts: Product[] = [
  new Product('P001', 'Laptop', 999.99, 10),
  new Product('P002', 'Phone', 499.99, 20),
  new Product('P003', 'Tablet', 299.99, 15),
];

export default function Item() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/products.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load product data');
        return res.json();
      })
      .then((data: Product[]) => {
        const found = data.find((p) => p.id === id);
        if (!found) {
          setError('Product not found.');
        } else {
          setProduct(found);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product data');
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem('awe_cart') || '[]');
    const item = cart.find((i: any) => i.productId === product.id);
    if (item) {
      if (item.quantity < product.stock) {
        item.quantity += 1;
      }
    } else {
      cart.push({ productId: product.id, quantity: 1 });
    }
    localStorage.setItem('awe_cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <Link to="/products" style={{ marginBottom: '1rem', display: 'inline-block' }}>
        ← Back to Products
      </Link>
      <h2>{product?.name}</h2>
      <p>Price: ${product?.price.toFixed(2)}</p>
      <p>Stock: {product?.stock}</p>
      <button onClick={handleAddToCart} disabled={product?.stock === 0}>
        {product?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
}
