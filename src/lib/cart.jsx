// Cart state (React context + reducer) saved to localStorage so it survives reloads.
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { products } from '../data/products.js';
import { FREE_SHIPPING_AT, MAX_QTY, SHIPPING_FEE } from './format.js';

const KEY = 'terra-cart-v1';
const CartCtx = createContext(null);

// Load safely: storage can be blocked or contain junk, and products can disappear.
function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
    return raw
      .filter((l) => l && Number.isInteger(l.qty) && l.qty > 0 && products.some((p) => p.id === l.id && p.inStock))
      .map((l) => ({ id: l.id, qty: Math.min(l.qty, MAX_QTY) }));
  } catch { return []; }
}

function reducer(s, a) {
  switch (a.type) {
    case 'add': {
      const f = s.find((l) => l.id === a.id);
      return f ? s.map((l) => (l.id === a.id ? { ...l, qty: Math.min(MAX_QTY, l.qty + a.qty) } : l))
               : [...s, { id: a.id, qty: Math.min(MAX_QTY, a.qty) }];
    }
    case 'set': return a.qty < 1 ? s.filter((l) => l.id !== a.id) : s.map((l) => (l.id === a.id ? { ...l, qty: Math.min(MAX_QTY, a.qty) } : l));
    case 'remove': return s.filter((l) => l.id !== a.id);
    case 'clear': return [];
    default: return s;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], load);
  const [notice, setNotice] = useState(null);

  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* storage blocked: cart still works this session */ } }, [items]);
  useEffect(() => { if (!notice) return; const t = setTimeout(() => setNotice(null), 2600); return () => clearTimeout(t); }, [notice]);

  const add = useCallback((p, qty = 1) => { dispatch({ type: 'add', id: p.id, qty }); setNotice({ msg: `${p.name} added to cart`, k: Date.now() }); }, []);

  const value = useMemo(() => {
    const lines = items.map((l) => ({ ...l, product: products.find((p) => p.id === l.id) })).filter((l) => l.product);
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.qty * l.product.price, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE;
    return { lines, count, subtotal, shipping, total: subtotal + shipping, notice, add, dispatch };
  }, [items, notice, add]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
export const useCart = () => useContext(CartCtx);
