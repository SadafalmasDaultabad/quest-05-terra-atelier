import { Link } from '../lib/router.jsx';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <div><p className="logo"><span className="logo-mark">T</span>Terra Atelier</p><p className="muted">Handcrafted homeware for slow, beautiful living.</p></div>
        <nav aria-label="Footer"><Link to="/shop">Shop all</Link><Link to="/shop?cat=Ceramics">Ceramics</Link><Link to="/shop?cat=Textiles">Textiles</Link><Link to="/cart">Cart</Link></nav>
      </div>
      <p className="wrap muted small">Demo store built for a web development capstone. Products and prices are sample data; no real orders are taken.</p>
    </footer>
  );
}
