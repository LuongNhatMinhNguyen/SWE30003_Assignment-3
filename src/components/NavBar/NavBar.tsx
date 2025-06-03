import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import '../../App.css';

type NavLink = {
  name: string;
  to: string;
};

const navLinks: NavLink[] = [
  { name: 'Register', to: '/register' },
  { name: 'Login', to: '/login' },
  { name: 'Products', to: '/products' },
  { name: 'Cart', to: '/cart' },
  { name: 'Profile', to: '/profile' },
];

export default function NavBar() {
  const [hovered, setHovered] = React.useState<string | null>(null);

  return (
    <nav className="navbar">
        <div className="navbar-brand"><Link to='/' >AWE Electronics</Link></div>
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

