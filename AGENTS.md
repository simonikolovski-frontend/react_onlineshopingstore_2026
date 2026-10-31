# AGENTS.md

Teaching project: React 19 + Vite 8 online store (course exercise). Plain JSX, no TypeScript, no tests. Product data comes from the public DummyJSON API — no backend, no env vars.

## Commands

- `npm run dev` — dev server
- `npm run lint` — **oxlint** (not ESLint/Prettier; there is no formatter or typecheck)
- `npm run build` — production build to `dist/` (gitignored; never commit it)
- `npm run preview` — serve the built app locally

There is no test command. CI (`.github/workflows/deploy.yml`) runs only `npm ci && npm run build`, not lint — run `npm run lint` yourself before finishing work. npm only (lockfile is `package-lock.json`).

## GitHub Pages deployment (easy to break)

Push to `main` auto-deploys to GitHub Pages. Three pieces must stay in sync with the repo name `react_onlineshopingstore_2026`:

1. `vite.config.js` — `base: '/react_onlineshopingstore_2026/'`
2. `src/main.jsx` — `BrowserRouter basename={import.meta.env.BASE_URL}` (never hardcode a basename)
3. `public/404.html` — SPA redirect hack for deep links on Pages; `pathSegmentsToKeep = 1` matches the base path depth

Use router `Link`/`NavLink`/`navigate` for all internal URLs — raw `<a href="/...">` breaks under the base path.

## Architecture

- `src/main.jsx` — entry; nests providers in a fixed order: QueryClientProvider → Theme → Auth → Cart → Favorites → Language → BrowserRouter → App. Also configures TanStack Query defaults (staleTime 2 min, retry 2, no refetch on window focus).
- `src/App.jsx` — routes. `/`, `/products`, and `/search` all render `Home`. `ProductDetails` is the only lazy-loaded page (`React.lazy` + `Suspense`).
- `src/api/client.js` — the only place that calls `fetch`; hits `https://dummyjson.com` and throws `ApiError` (with `.status`) on non-OK responses. `src/api/products.js` defines the endpoint functions.
- `src/context/*.jsx` — app state via Context + `useReducer`, persisted with `src/hooks/useLocalStorage.jsx` (cart, favorites, theme, language survive refresh).
- Server state: always through TanStack Query (`useQuery` + `products.*`), never raw `fetch` in components.

## Code style (deliberate, do not "fix")

This is a course repo read line-by-line by students. Files use a distinctive verbose format: `// ====` banner comment sections, imports deliberately split across multiple lines, blank lines between almost every statement, long explanatory comments. Match this style in new/edited code and do not reformat existing files into compact style. Run `npm run lint` — `react/rules-of-hooks` is an error.
