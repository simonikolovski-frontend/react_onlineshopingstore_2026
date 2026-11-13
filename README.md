# React E-Commerce Store

A responsive e-commerce portfolio application built with **React 19** and **Vite** as a final frontend development project.

**[🌐 Live Demo](https://simonikolovski-frontend.github.io/react_onlineshopingstore_2026/)** · **[Source Code](https://github.com/simonikolovski-frontend/react_onlineshopingstore_2026)**

## Features

- Browse products retrieved from the [DummyJSON API](https://dummyjson.com/).
- Search products and filter by category.
- Navigate through product listings with pagination.
- View individual product details with client-side routing and lazy loading.
- Add and remove products from a shopping cart.
- Save favorites and revisit them later.
- Persist cart and favorite data in browser local storage.
- Responsive interface, with language and theme context.

> **Portfolio demo:** Login is simulated locally; there is no real user authentication, checkout, payment processing, or backend order management.

## Tech stack

- **Frontend:** React 19, JavaScript, HTML5, CSS3, Vite
- **Routing:** React Router
- **Data fetching / caching:** TanStack Query and Fetch API
- **State:** React Context, hooks and useReducer
- **Testing / tooling:** Vitest, Oxlint
- **Hosting:** GitHub Pages with GitHub Actions

## Run locally

Requirements: Node.js and npm.

```bash
git clone https://github.com/simonikolovski-frontend/react_onlineshopingstore_2026.git
cd react_onlineshopingstore_2026
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Useful commands

```bash
npm run dev       # Development server
npm run build     # Production build
npm run preview   # Preview production build
npm run test      # Run tests
npm run lint      # Run Oxlint
```

## Deployment

The project is hosted on GitHub Pages under the repository path `/react_onlineshopingstore_2026/`. The Vite `base` option and React Router `basename` are configured for that path. A GitHub Actions workflow builds and deploys the `dist` directory.

## Author

**Simo Nikolovski** — Frontend Development Academy, Creative Hub (2025–2026).

[GitHub Profile](https://github.com/simonikolovski-frontend)
