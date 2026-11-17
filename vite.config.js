import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// `vite build` minifies JS/CSS and code-splits the lazy-loaded pages automatically.
export default defineConfig({ plugins: [react()] });
