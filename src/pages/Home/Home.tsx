import '../Home/Home.css'
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../models/Product';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

class NavLinkModel {
  constructor(public name: string, public to: string) {}
}

type HomeState = {
  hovered: string;
};

export default class Home extends React.Component<{}, HomeState> {
  featuredProducts: Product[] = [
    new Product('P001', 'Laptop', 999.99, 10),
    new Product('P002', 'Phone', 499.99, 20),
    new Product('P003', 'Tablet', 299.99, 15),
  ];

  constructor(props: {}) {
    super(props);
    this.state = { hovered: '' };
  }

  handleMouseEnter = (name: string) => this.setState({ hovered: name });
  handleMouseLeave = () => this.setState({ hovered: '' });

  render() {
    return (
      <div className="home-container">

        {/* Main Section */}
        <main className="home-main">
          <h1>Welcome to AWE Electronics</h1>
          <p>Browse our wide range of products and shop with ease</p>
        </main>

        {/* Featured Section */}
        <section className="featured-section">
          <h2>Featured Products</h2>
          <div className="featured-products">
            {this.featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                {product.name} - ${product.price.toFixed(2)}
              </div>
            ))}
          </div>
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <button className="shop-now-button">Shop Now</button>
          </Link>
        </section>
      </div>
    );
  }
}
