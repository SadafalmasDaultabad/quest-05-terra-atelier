import { useState } from 'react';
import { Link } from '../lib/router.jsx';
import { getProduct, products } from '../data/products.js';
import { useCart } from '../lib/cart.jsx';
import { inr } from '../lib/format.js';
import ProductArt from '../components/ProductArt.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Stepper from '../components/Stepper.jsx';
import EmptyState from '../components/EmptyState.jsx';

export default function Product({ id }) {
  const p = getProduct(id);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  if (!p) return <div className="wrap section"><EmptyState title="Product not found" text="This product doesn’t exist or is no longer available." action="Back to the shop" to="/shop" /></div>;
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3);
  return (
    <div className="wrap section">
      <nav className="crumbs" aria-label="Breadcrumb"><Link to="/shop">Shop</Link> / <Link to={`/shop?cat=${p.category}`}>{p.category}</Link> / <span>{p.name}</span></nav>
      <div className="detail">
        <div className="detail-media"><ProductArt product={p} /></div>
        <div className="detail-info">
          <p className="eyebrow">{p.category}</p>
          <h1>{p.name}</h1>
          <p className="muted">★ {p.rating.toFixed(1)} · Sample rating</p>
          <p className="price">{inr(p.price)}</p>
          <p className="lead">{p.blurb}</p>
          <ul className="specs">{p.details.map((d) => <li key={d}>{d}</li>)}</ul>
          {p.inStock ? (
            <div className="row">
              <Stepper value={qty} onChange={(v) => setQty(Math.max(1, v))} label={p.name} />
              <button className="btn" onClick={() => add(p, qty)}>Add to cart</button>
            </div>
          ) : <p className="notice" role="status">Currently sold out. Check back soon.</p>}
          <Link to="/cart" className="link">Go to cart →</Link>
        </div>
      </div>
      {related.length > 0 && <><h2 className="mt">You may also like</h2><div className="grid">{related.map((r) => <ProductCard key={r.id} product={r} />)}</div></>}
    </div>
  );
}
