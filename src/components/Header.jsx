import { useState } from 'react';
import { Link } from '../lib/router.jsx';
import { useCart } from '../lib/cart.jsx';

const NAV = [['/', 'Home'], ['/shop', 'Shop'], ['/cart', 'Cart']];

export default function Header({ path }) {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const active = (to) => (to === '/' ? path === '/' : path.startsWith(to));
  return (
    <header className="header">
      <div className="wrap header-in">
        <Link to="/" className="logo" aria-label="Terra Atelier home"><span className="logo-mark">T</span>Terra Atelier</Link>
        <button className="menu-btn" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
        <nav id="nav" className={'nav' + (open ? ' open' : '')} aria-label="Main">
          {NAV.map(([to, label]) => (
            <Link key={to} to={to} onClick={() => setOpen(false)} aria-current={active(to) ? 'page' : undefined}>
              {label}{to === '/cart' && <span className="count" aria-label={`${count} items in cart`}>{count}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
