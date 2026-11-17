// Searchable catalog. Search, category and sort live in the URL (?q=&cat=&sort=)
// so links can be shared and Back/Forward restore the same view.
import { useMemo } from 'react';
import { navigate } from '../lib/router.jsx';
import { products, categories } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import EmptyState from '../components/EmptyState.jsx';

const SORTS = {
  featured: ['Featured', () => 0],
  'price-asc': ['Price: low to high', (a, b) => a.price - b.price],
  'price-desc': ['Price: high to low', (a, b) => b.price - a.price],
  rating: ['Top rated', (a, b) => b.rating - a.rating],
  name: ['Name A–Z', (a, b) => a.name.localeCompare(b.name)],
};

export default function Catalog({ query }) {
  const q = query.get('q') || '', cat = categories.includes(query.get('cat')) ? query.get('cat') : 'All';
  const sort = SORTS[query.get('sort')] ? query.get('sort') : 'featured';

  const set = (patch) => {
    const next = { q, cat, sort, ...patch }, p = new URLSearchParams();
    if (next.q) p.set('q', next.q);
    if (next.cat !== 'All') p.set('cat', next.cat);
    if (next.sort !== 'featured') p.set('sort', next.sort);
    navigate('/shop' + (p.toString() ? '?' + p : ''), { replace: true });
  };

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products
      .filter((p) => (cat === 'All' || p.category === cat) && (!term || `${p.name} ${p.category} ${p.blurb}`.toLowerCase().includes(term)))
      .sort(SORTS[sort][1]);
  }, [q, cat, sort]);

  return (
    <div className="wrap section">
      <h1 className="page-title">The collection</h1>
      <div className="toolbar">
        <label className="field grow"><span>Search products</span>
          <input type="search" value={q} placeholder="Try “vase” or “indigo”" onChange={(e) => set({ q: e.target.value })} />
        </label>
        <label className="field"><span>Sort by</span>
          <select value={sort} onChange={(e) => set({ sort: e.target.value })}>{Object.entries(SORTS).map(([k, [l]]) => <option key={k} value={k}>{l}</option>)}</select>
        </label>
      </div>
      <div className="chips" role="group" aria-label="Filter by category">
        {['All', ...categories].map((c) => <button key={c} className={'chip' + (c === cat ? ' on' : '')} aria-pressed={c === cat} onClick={() => set({ cat: c })}>{c}</button>)}
      </div>
      <p className="muted" role="status" aria-live="polite">{results.length} {results.length === 1 ? 'product' : 'products'}</p>
      {results.length ? <div className="grid">{results.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        : <EmptyState title="No products match" text="Try a different search word or clear the filters." action={<button className="btn" onClick={() => navigate('/shop', { replace: true })}>Clear filters</button>} />}
    </div>
  );
}
