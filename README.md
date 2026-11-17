# Terra Atelier — E-commerce Product Catalog (Quest 5 Capstone)

A handcrafted-homeware storefront: home page, searchable catalog (category filters + sorting),
product detail pages, and a cart with quantity controls that is saved in the browser.
All product data is **sample data** (`src/data/products.js`). No payments or accounts.

## Project structure
```
src/
  components/  reusable UI (Header, Footer, ProductCard, ProductArt, Stepper, EmptyState)
  pages/       one file per route (Home, Catalog, Product, Cart, NotFound)
  data/        sample products
  lib/         router.jsx (client-side routing), cart.jsx (cart state + localStorage), format.js
  App.jsx      app shell + route table      main.jsx  entry      styles.css  design tokens + styles
```
Routes: `/`, `/shop` (supports `?q=&cat=&sort=`), `/product/:id`, `/cart`, anything else → 404 page.

## Run locally (needs Node.js 18+)
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # minified production build in dist/
npm run preview    # test the production build locally
```

## Deploy on Vercel

Push this project to GitHub, then in Vercel choose **Add New → Project** and import the repository.
Use the **Vite** framework preset, build command `npm run build`, and output directory `dist`.
The included `vercel.json` supports refreshing client-side routes.

After deploying, open `/shop` and `/product/ember-lamp` directly and refresh to confirm no error.

## Quest 5 checklist
- [x] Modular frontend (components / pages / data / lib separated)
- [x] Client-side routing (History API router, Back/Forward, 404 page)
- [x] Optimized assets: inline SVG illustrations (no image downloads), lazy-loaded pages, minified build
- [ ] Deployed with a public URL — done by you using the steps above
