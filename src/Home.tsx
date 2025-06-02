import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from './models/Product'; // <-- Remove .ts extension

// OO navigation link class
class NavLinkModel {
  constructor(public name: string, public to: string) {}
}

type HomeState = {
  hovered: string;
};

export default class Home extends React.Component<{}, HomeState> {
  navLinks: NavLinkModel[] = [
    new NavLinkModel('Home', '/'),
    new NavLinkModel('Register', '/register'),
    new NavLinkModel('Login', '/login'),
    new NavLinkModel('Products', '/products'),
    new NavLinkModel('Cart', '/cart'),
    new NavLinkModel('Profile', '/profile'),
  ];

  featuredProducts: Product[] = [
    new Product('P001', 'Laptop', 999.99),
    new Product('P002', 'Phone', 499.99),
    new Product('P003', 'Tablet', 299.99),
  ];

  navLinkStyle: React.CSSProperties = {
    color: '#fff',
    textDecoration: 'none',
    marginLeft: '24px',
    fontSize: '1.1rem',
    fontWeight: 500,
    padding: '6px 0',
    borderBottom: '2px solid transparent',
    transition: 'border-bottom 0.2s, color 0.2s',
  };

  navLinkHover: React.CSSProperties = {
    textDecoration: 'underline',
    borderBottom: '2px solid #fff',
  };

  constructor(props: {}) {
    super(props);
    this.state = { hovered: '' };
  }

  handleMouseEnter = (name: string) => this.setState({ hovered: name });
  handleMouseLeave = () => this.setState({ hovered: '' });

  render() {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
        {/* Navbar */}
        <nav
          style={{
            background: '#333',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 40px',
          }}
        >
          <div style={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: '1px' }}>AWE Electronics</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {this.navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                style={{
                  ...this.navLinkStyle,
                  ...(this.state.hovered === link.name ? this.navLinkHover : {}),
                }}
                onMouseEnter={() => this.handleMouseEnter(link.name)}
                onMouseLeave={this.handleMouseLeave}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Main Section */}
        <main
          style={{
            background: '#f5f5f5',
            textAlign: 'center',
            padding: '50px 10px',
          }}
        >
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '20px', color: '#000' }}>
            Welcome to AWE Electronics
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#444', margin: 0 }}>
            Browse our wide range of products and shop with ease
          </p>
        </main>

        {/* Teaser Section */}
        <section
          style={{
            background: '#e0e0e0',
            textAlign: 'center',
            padding: '30px 10px',
            margin: '30px 0',
          }}
        >
          <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '25px' }}>Featured Products</h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              marginBottom: '25px',
              flexWrap: 'wrap',
            }}
          >
            {this.featuredProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  border: '1px solid gray',
                  borderRadius: '8px',
                  padding: '10px',
                  width: '200px',
                  background: '#fff',
                  boxSizing: 'border-box',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  fontWeight: 500,
                  fontSize: '1.1rem',
                  color: '#000',
                }}
              >
                {product.name} - ${product.price.toFixed(2)}
              </div>
            ))}
          </div>
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <button
              style={{
                marginTop: '10px',
                padding: '0.7rem 2.5rem',
                background: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'background 0.2s',
              }}
              onMouseOver={e => (e.currentTarget.style.background = '#0056b3')}
              onMouseOut={e => (e.currentTarget.style.background = '#007bff')}
            >
              Shop Now
            </button>
          </Link>
        </section>

        {/* Footer */}
        <footer
          style={{
            background: '#333',
            color: '#fff',
            textAlign: 'center',
            padding: '20px 0',
            marginTop: 'auto',
            fontSize: '1rem',
            letterSpacing: '0.5px',
          }}
        >
          <p style={{ margin: 0 }}>© 2025 AWE Electronics. All rights reserved.</p>
        </footer>
      </div>
    );
  }
}