import './Item.css';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../../models/Product';

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
    <div className="item-container">
        <div className="item-header">
            <Link to="/products" className="button-link button-back">Back to Products</Link>
            <Link to="/cart" className="button-link button-cart">Go to Cart</Link>
        </div>
        <div className="item-card">
            <img
                src={`/images/${product?.id}.webp`}
                alt={product?.name}
                className="product-image"
                />
            <h2>{product?.name}</h2>
            <div className="price">Price: ${product?.price.toFixed(2)}</div>
            <div className="stock">Stock: {product?.stock}</div>
            <button
                className="add-button"
                onClick={handleAddToCart} disabled={product?.stock === 0}
                >
                Add to Cart
            </button>
            <div className="product-desc">
                <strong>Description:</strong>
                {product?.desc?.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
        </div>
    </div>
  );
}
