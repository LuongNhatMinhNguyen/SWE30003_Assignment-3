import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import '../../App.css';

type NavLink = {
  name: string;
  to: string;
};

export default function NavBar() {
  const [hovered, setHovered] = React.useState<string | null>(null);
  const isLoggedIn = localStorage.getItem("awe_logged_in") !== null;

   let navLinks: NavLink[] = [];

  if (isLoggedIn) {
    navLinks = [
      { name: 'Products', to: '/products' },
      { name: 'Cart', to: '/cart' },
      { name: 'Profile', to: '/profile' },
    ];
  } else {
    navLinks = [
      { name: 'Products', to: '/products' },
      { name: 'Cart', to: '/cart' },
      { name: 'Register', to: '/register' },
      { name: 'Login', to: '/login' },
    ];
  }

  return (
    <nav className="navbar">
        <div className="navbar-brand"><Link className="navbar-brand-link" to='/' onMouseEnter={() => setHovered('navbar-brand')} onMouseLeave={() => setHovered(null)} >AWE Electronics</Link></div>
        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`navbar-link ${hovered === link.name ? 'hovered' : ''}`}
              onMouseEnter={() => setHovered(link.name)}
              onMouseLeave={() => setHovered(null)}
            >
              {link.name}
            </Link>
          ))}
        </div>
    </nav>
  );
}

