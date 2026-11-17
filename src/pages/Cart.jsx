import { useState } from 'react';
import { Link } from '../lib/router.jsx';
import { useCart } from '../lib/cart.jsx';
import { inr, FREE_SHIPPING_AT } from '../lib/format.js';
import ProductArt from '../components/ProductArt.jsx';
import Stepper from '../components/Stepper.jsx';
import EmptyState from '../components/EmptyState.jsx';

export default function Cart() {
  const { lines, subtotal, shipping, total, dispatch } = useCart();
  const [done, setDone] = useState(false);
  if (done) return <div className="wrap section"><EmptyState title="Thank you!" text="This is a demo store, so no real order was placed or charged." action="Keep browsing" to="/shop" /></div>;
  if (!lines.length) return <div className="wrap section"><EmptyState title="Your cart is empty" text="Add something lovely from the collection." action="Start shopping" to="/shop" /></div>;
  return (
    <div className="wrap section">
      <h1 className="page-title">Your cart</h1>
      <div className="cart">
        <ul className="lines">
          {lines.map(({ product: p, qty }) => (
            <li key={p.id} className="line">
              <Link to={`/product/${p.id}`} className="thumb" aria-label={`View ${p.name}`}><ProductArt product={p} /></Link>
              <div className="line-info">
                <h3><Link to={`/product/${p.id}`}>{p.name}</Link></h3>
                <p className="muted">{inr(p.price)} each</p>
                <button className="link-btn" onClick={() => dispatch({ type: 'remove', id: p.id })} aria-label={`Remove ${p.name} from cart`}>Remove</button>
              </div>
              <Stepper value={qty} label={p.name} onChange={(v) => dispatch({ type: 'set', id: p.id, qty: v })} />
              <strong className="line-total">{inr(p.price * qty)}</strong>
            </li>
          ))}
        </ul>
        <aside className="summary" aria-label="Order summary">
          <h2>Order summary</h2>
          <dl>
            <div><dt>Subtotal</dt><dd>{inr(subtotal)}</dd></div>
            <div><dt>Shipping</dt><dd>{shipping ? inr(shipping) : 'Free'}</dd></div>
            <div className="total"><dt>Total</dt><dd>{inr(total)}</dd></div>
          </dl>
          {shipping > 0 && <p className="muted small">Add {inr(FREE_SHIPPING_AT - subtotal)} more for free shipping.</p>}
          <button className="btn wide" onClick={() => { dispatch({ type: 'clear' }); setDone(true); }}>Place demo order</button>
          <button className="btn btn-ghost wide" onClick={() => dispatch({ type: 'clear' })}>Clear cart</button>
        </aside>
      </div>
    </div>
  );
}
