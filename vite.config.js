// ==================================================
// VITE
// ==================================================

import {
  defineConfig
} from 'vite';


// ==================================================
// REACT
// ==================================================

import react
  from '@vitejs/plugin-react';


// ==================================================
// VITE CONFIG
// ==================================================

export default defineConfig({

  // React plugin.

  plugins: [
    react()
  ],


  // ==================================================
  // GITHUB PAGES BASE PATH
  // ==================================================

  /*
    Our GitHub repository is:

    react_onlineshopingstore_2026

    GitHub Pages will publish the app at:

    https://simonikolovski-frontend.github.io/
    react_onlineshopingstore_2026/

    Because the project is NOT deployed
    directly at the root of the domain,
    Vite needs this base path.
  */

  base:
    '/react_onlineshopingstore_2026/'

});