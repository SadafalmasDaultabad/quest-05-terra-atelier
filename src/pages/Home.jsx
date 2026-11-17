import { Link } from '../lib/router.jsx';
import { products, categories } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import ProductArt from '../components/ProductArt.jsx';

const hero = ['sundial-vase', 'dune-throw', 'ember-lamp'].map((id) => products.find((p) => p.id === id));
const perks = [['Handmade', 'Every piece is shaped by independent artisans.'], ['Free shipping', 'On orders over ₹3,000.'], ['Easy returns', '14 days, no questions asked.']];

export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">New season · Autumn collection</p>
          <h1>Objects that make a home feel <em>lived in</em>.</h1>
          <p className="lead">Terra Atelier brings together handcrafted ceramics, textiles, lighting and decor in warm, earthy tones.</p>
          <div className="row"><Link to="/shop" className="btn">Shop the collection</Link><Link to="/shop?cat=Ceramics" className="btn btn-ghost">Explore ceramics</Link></div>
        </div>
        <div className="hero-art" aria-hidden="true">
          {hero.map((p, i) => <div key={p.id} className={'hero-tile t' + i}><ProductArt product={p} /></div>)}
        </div>
      </section>

      <section className="wrap section">
        <h2>Shop by category</h2>
        <div className="cats">
          {categories.map((c) => {
            const sample = products.find((p) => p.category === c);
            return <Link key={c} to={`/shop?cat=${c}`} className="cat"><ProductArt product={sample} /><span>{c}<small>{products.filter((p) => p.category === c).length} pieces →</small></span></Link>;
          })}
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head"><h2>Bestsellers &amp; new arrivals</h2><Link to="/shop">View all →</Link></div>
        <div className="grid">{products.filter((p) => p.badge && p.inStock).slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>

      <section className="wrap perks">
        {perks.map(([t, d]) => <div key={t}><h3>{t}</h3><p className="muted">{d}</p></div>)}
      </section>
    </>
  );
}
