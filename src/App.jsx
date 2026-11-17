// App shell: header + routed page + footer. Page components are lazy-loaded, so the
// production build splits them into separate small files that load on demand.
import { lazy, Suspense, useEffect } from 'react';
import { useRoute, match } from './lib/router.jsx';
import { CartProvider, useCart } from './lib/cart.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
const Catalog = lazy(() => import('./pages/Catalog.jsx'));
const Product = lazy(() => import('./pages/Product.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));

function Toast() {
  const { notice } = useCart();
  return <div className="toast-zone" role="status" aria-live="polite">{notice && <div key={notice.k} className="toast">✓ {notice.msg}</div>}</div>;
}

function Routes({ path, query }) {
  let params;
  if (path === '/') return <Home />;
  if (path === '/shop') return <Catalog query={query} />;
  if (path === '/cart') return <Cart />;
  if ((params = match('/product/:id', path))) return <Product key={params.id} id={params.id} />;
  return <NotFound />;
}

export default function App() {
  const { path, query } = useRoute();
  useEffect(() => { document.title = 'Terra Atelier — Handcrafted homeware'; window.scrollTo({ top: 0 }); }, [path]);
  return (
    <CartProvider>
      <a href="#main" className="skip" onClick={(e) => { e.preventDefault(); document.getElementById('main').focus(); }}>Skip to content</a>
      <Header path={path} />
      <main id="main" tabIndex={-1} key={path}>
        <Suspense fallback={<p className="wrap section muted">Loading…</p>}><Routes path={path} query={query} /></Suspense>
      </main>
      <Footer />
      <Toast />
    </CartProvider>
  );
}
