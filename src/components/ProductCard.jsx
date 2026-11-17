import { Link } from '../lib/router.jsx';
import { useCart } from '../lib/cart.jsx';
import { inr } from '../lib/format.js';
import ProductArt from './ProductArt.jsx';

export default function ProductCard({ product: p }) {
  const { add } = useCart();
  return (
    <article className="card">
      <Link to={`/product/${p.id}`} className="card-media" aria-label={`View ${p.name}`}>
        <ProductArt product={p} />
        {p.badge && p.inStock && <span className="badge">{p.badge}</span>}
        {!p.inStock && <span className="badge badge-out">Sold out</span>}
      </Link>
      <div className="card-body">
        <p className="eyebrow">{p.category}</p>
        <h3><Link to={`/product/${p.id}`}>{p.name}</Link></h3>
        <p className="muted">★ {p.rating.toFixed(1)}</p>
        <div className="card-foot">
          <strong>{inr(p.price)}</strong>
          <button className="btn btn-small" disabled={!p.inStock} onClick={() => add(p)} aria-label={`Add ${p.name} to cart`}>
            {p.inStock ? 'Add' : 'Sold out'}
          </button>
        </div>
      </div>
    </article>
  );
}
