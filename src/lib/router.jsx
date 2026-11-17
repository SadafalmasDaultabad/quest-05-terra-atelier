// A tiny client-side router built on the browser History API.
// - Link / navigate() change the URL without reloading the page.
// - Back/Forward work because we listen to the browser's "popstate" event.
// - In the Claude preview (sandboxed iframe) we use #hash URLs instead; set by VITE_ROUTER=hash.
import { useEffect, useState } from 'react';

const HASH = import.meta.env.VITE_ROUTER === 'hash';

function read() {
  const raw = HASH ? window.location.hash.slice(1) || '/' : window.location.pathname + window.location.search;
  const [path, q = ''] = raw.split('?');
  return { path: path || '/', query: new URLSearchParams(q) };
}

export function navigate(to, { replace = false } = {}) {
  const url = HASH ? '#' + to : to;
  if (replace) window.history.replaceState(null, '', url);
  else window.history.pushState(null, '', url);
  window.dispatchEvent(new Event('route-change'));
}

export function useRoute() {
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const update = () => setRoute(read());
    window.addEventListener('popstate', update); // Back / Forward buttons
    window.addEventListener('hashchange', update);
    window.addEventListener('route-change', update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener('hashchange', update);
      window.removeEventListener('route-change', update);
    };
  }, []);
  return route;
}

export function Link({ to, children, onClick, ...rest }) {
  const handle = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
    window.scrollTo({ top: 0 });
  };
  return <a href={HASH ? '#' + to : to} onClick={handle} {...rest}>{children}</a>;
}

// Match "/product/:id" style patterns. Returns params or null.
export function match(pattern, path) {
  const a = pattern.split('/').filter(Boolean), b = path.split('/').filter(Boolean);
  if (a.length !== b.length) return null;
  const params = {};
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith(':')) params[a[i].slice(1)] = decodeURIComponent(b[i]);
    else if (a[i] !== b[i]) return null;
  }
  return params;
}
