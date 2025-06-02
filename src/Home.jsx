import React from 'react';
import { Link } from 'react-router-dom';

// Placeholder for future context integration
// e.g., const { isAuthenticated, user } = useContext(AuthContext);

const navLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  marginLeft: '24px',
  fontSize: '1.1rem',
  fontWeight: 500,
  padding: '6px 0',
  borderBottom: '2px solid transparent',
  transition: 'border-bottom 0.2s, color 0.2s',
};

const navLinkHover = {
  textDecoration: 'underline',
  borderBottom: '2px solid #fff',
};

const Home = () => {
  // For hover effect with inline styles, use onMouseEnter/onMouseLeave
  const [hovered, setHovered] = React.useState('');

  const handleMouseEnter = (name) => setHovered(name);
  const handleMouseLeave = () => setHovered('');

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
          {[
            { name: 'Home', to: '/' },
            { name: 'Register', to: '/register' },
            { name: 'Login', to: '/login' },
            { name: 'Products', to: '/products' },
            { name: 'Cart', to: '/cart' },
            { name: 'Profile', to: '/profile' },
          ].map((link) => (
            <Link
              key={link.name}
              to={link.to}
              style={{
                ...navLinkStyle,
                ...(hovered === link.name ? navLinkHover : {}),
              }}
              onMouseEnter={() => handleMouseEnter(link.name)}
              onMouseLeave={handleMouseLeave}
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
          Welcome to AWE Electronics - Your Online Electronics Store
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#444', margin: 0 }}>
          Browse our wide range of products and shop with ease! From laptops to phones, we’ve got it all.
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
          {[
            { name: 'Laptop', price: '$999.99' },
            { name: 'Phone', price: '$499.99' },
            { name: 'Tablet', price: '$299.99' },
          ].map((product) => (
            <div
              key={product.name}
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
                color: '#000', // <-- Set text color to black
              }}
            >
              {product.name} - {product.price}
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
            onMouseOver={e => (e.target.style.background = '#0056b3')}
            onMouseOut={e => (e.target.style.background = '#007bff')}
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
};

export default Home;