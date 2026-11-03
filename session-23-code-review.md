# Session 23 — Capstone Code Review Note

**Review date:** 2026-11-03
**Scope:** all files under `src/`, plus configs. Read-only review — **no code was changed**.
**Tools:** manual file review + `npm run lint` (oxlint).

---

## 🔴 HIGH

### 1. `src/pages/Home.jsx` (lines 286–350) — debounce effect hijacks routes on mount

- **Problem:** The search-debounce effect runs on mount. With an empty input it calls `navigate('/')` after 500ms — so opening `/products` (e.g. via the breadcrumb "Products" link) silently redirects to `/`, and the breadcrumb disappears.
- **Why:** Effects run on mount; nothing guards "user didn't actually type". The `/products` and bare `/search` routes in `App.jsx` are effectively dead.
- **Seriousness:** **High** — real routing bug, visible URL change, confusing Back behavior.
- **Simplest fix:** Only navigate when the input differs from the URL:
  `if (cleanSearch && cleanSearch !== search)` … else `if (!cleanSearch && resetFromLogo !== '1' && search)` (add `search` to deps). On mount both branches then no-op.

---

## 🟡 MEDIUM

### 2. `src/pages/Cart.jsx` (line 152) — bad list key

- **Problem:** `key={`${item.id}-${index}`}` mixes id with index.
- **Why:** Remove item 0 → all later indexes shift → keys change → React unmounts/remounts those rows instead of updating them. Defeats `memo(ProductListItem)` and is wrong outright if duplicate ids ever exist.
- **Seriousness:** **Medium** — wrong-key class of bug; currently masked because rows are simple.
- **Simplest fix:** `key={item.id}` (safe once #3 prevents duplicate ids).

### 3. `src/context/CartContext.jsx` (lines 48–56) — reducer allows duplicate cart items

- **Problem:** `ADD_ITEM` blindly appends; no same-id guard. Uniqueness is enforced only by the UI check in `ProductDetails.jsx:250`.
- **Why:** The reducer is the data contract. Any future add-path that misses the UI check creates duplicate rows (which then interact badly with key #2). Double-add in the same tick is also possible.
- **Seriousness:** **Medium** — latent data bug, defense-in-depth.
- **Simplest fix:** In `ADD_ITEM`: `items: state.items.some(i => i.id === action.payload.id) ? state.items : [...state.items, action.payload]`.

### 4. `src/context/LanguageContext.jsx` (line 267) — `t()` can crash on unknown stored language

- **Problem:** `translations[language][key] ?? key` — if the `language` value in localStorage isn't `English`/`Macedonian`, `translations[language]` is `undefined` → TypeError on `[key]`.
- **Why:** localStorage is user-editable and values persist across schema changes; this runs on every render of every consumer.
- **Seriousness:** **Medium** — low probability, but total app crash when it happens.
- **Simplest fix:** `return translations[language]?.[key] ?? key;`

### 5. `src/main.jsx` / whole app — no ErrorBoundary

- **Problem:** Nothing catches render errors. Any component throw (e.g. #4, #6) → white screen.
- **Why:** React unmounts the whole tree on uncaught render errors; only error boundaries recover — Session 23's topic.
- **Seriousness:** **Medium** — no graceful degradation anywhere.
- **Simplest fix:** Add a class `ErrorBoundary` with `getDerivedStateFromError` + fallback UI, wrap `<App />` inside `main.jsx`.

### 6. `src/context/CartContext.jsx` (line 129) — unvalidated localStorage used as reducer initial state

- **Problem:** `useReducer(cartReducer, savedCart)` trusts whatever JSON is under the `cart` key. If it's valid JSON but wrong shape (`{}`, `[]`, missing `items`), first render of `Cart.jsx` (`items.length`) or any action crashes.
- **Why:** `useLocalStorage` catches *parse* errors but not *shape* errors.
- **Seriousness:** **Medium** — corrupt/legacy data bricks the cart until storage is cleared.
- **Simplest fix:** `useReducer(cartReducer, savedCart?.items ? savedCart : initialState)`.

---

## 🟢 LOW

### 7. All `src/context/*.jsx` — context values recreated every render

- **Problem:** Each provider builds `value={{...}}` inline; exposed functions (`addItem`, `toggleFavorite`, `t`…) are new identities every render.
- **Why:** New value identity → every consumer re-renders. Worse, providers are nested (Cart → Favorites → Language), so a cart change re-renders the inner providers too, churning *their* values as well.
- **Seriousness:** **Low** — app is small; measurable only as extra renders.
- **Simplest fix:** `useMemo(() => ({...}), [deps])` for values + `useCallback` for the functions.

### 8. `src/pages/Cart.jsx` (65) & `src/pages/Favorites.jsx` (82) — `useCallback` is a no-op

- **Problem:** `handleRemove` depends on `removeItem` / `removeFavorite`, which are recreated every provider render (see #7), so the callback identity changes anyway.
- **Why:** The `useCallback` was meant to keep `memo(ProductListItem)` effective — it can't, because its dep is never stable.
- **Seriousness:** **Low** — dead optimization, harmless but misleading.
- **Simplest fix:** Fix #7 (then these start working), or delete the `useCallback`s as honest code.

### 9. `src/components/Header.jsx` (line 125) — logout clears cart but not favorites

- **Problem:** `handleLogout` calls `clearCart()` but favorites persist in localStorage. Header even hides the count (`user ? favorites.length : 0`) while data remains — re-login resurrects it.
- **Why:** Inconsistent session semantics: cart = per-session, favorites = per-browser (by accident, not design).
- **Seriousness:** **Low** — product/design decision, but currently contradictory.
- **Simplest fix:** Decide the rule; if per-session, also clear favorites on logout (would need a `clearFavorites` in FavoritesContext).

### 10. `src/pages/Home.jsx` (lines 299–350) — history pollution while typing

- **Problem:** Every debounce that changes the query pushes a new history entry (`navigate` without `replace`). Slow typers get `/search?q=p`, `q=ph`, `q=pho`… as separate Back steps.
- **Why:** `navigate()` defaults to push.
- **Seriousness:** **Low** — UX annoyance.
- **Simplest fix:** Skip navigation when the target equals the current URL (same guard as #1); add `{ replace: true }` for search updates.

### 11. `src/pages/Home.jsx` (line 494) — `|| []` creates a new array every render

- **Problem:** `productData?.products || []` — when data is undefined, a fresh `[]` each render → `useMemo` deps change every render (oxlint flags this: `react-hooks/exhaustive-deps`, Home.jsx:532).
- **Why:** Unnecessary filter recompute; the lint warning is accurate.
- **Seriousness:** **Low** — trivial cost at this scale.
- **Simplest fix:** Module-level `const EMPTY = [];` then `productData?.products ?? EMPTY`.

### 12. Lint warnings (informational, not runtime bugs)

- `react(set-state-in-effect)` at `Home.jsx:210, 268` — the URL↔input sync effects. They're event-driven and correct for this pattern; the lint rule is advisory. No change needed for correctness.
- `react(only-export-components)` ×5 on context files — fast-refresh only; known course style. Ignore.

---

## ✅ Already correct (verified)

| Area | Verdict |
|---|---|
| **Fetch cancellation** | ✅ Every `useQuery` passes `signal` → `apiClient` → `fetch`. Unmount/param-change aborts correctly. |
| **`useEffect` dependencies** | ✅ All effects list complete deps (`reset` effect, debounce, theme `[theme]`, cart-save `[state, setSavedCart]`, storage `[key, value]`). |
| **Effect cleanup** | ✅ Debounce clears its timeout; other effects don't need cleanup (theme class is fully rewritten each run — safe). |
| **State updates during render** | ✅ None found — all setState in handlers/effects. |
| **Stale closures** | ✅ Reducer + functional updaters (`prev => …`) used everywhere it matters; single-event reads are safe. |
| **Favorites list key** | ✅ `key={product.id}` (`Favorites.jsx:183`). Products/categories/breadcrumb keys all fine. |
| **Async/undefined guards** | ✅ `ProductDetails` checks `isPending`/`isError` before touching `product`; `Home` uses `productData?.products`; Breadcrumb uses `product?.title`; `error?.message`. |
| **Routing basics** | ✅ `basename` correct per `AGENTS.md`; `Navigate` guard on Favorites; `*` → NotFound; lazy + Suspense for ProductDetails; Back uses `location.state?.from \|\| '/'`. |
| **Reset flow** | ✅ Logo `/?reset=1` → reset effect uses `navigate(..., { replace: true })`; debounce correctly skips navigating while `reset=1`. |
| **localStorage reads** | ✅ `try/catch` around parse, falls back to initial value. |
| **Reducer immutability** | ✅ All cases return new state, no mutation. |
| **Pagination resets** | ✅ Category change, search change, clear-filters all reset to page 1 — no out-of-range page path found. |
| **Total price** | ✅ `reduce` with `0` initial; `.toFixed(2)` for display. |

---

## Suggested fix order

1. **#1** (route hijack — only real "broken behavior" today)
2. **#2 + #3** together (key + duplicate guard)
3. **#4, #5, #6** (crash-safety: optional chaining, ErrorBoundary, state validation)
4. The rest (perf/design polish)

## Related notes

- `session-20-exercises-2.md` — Exercise 2 debugging note (documented "Failed to fetch" fix, not applied)
- Session 23 exercises: this review is the raw material for the required 2+ tests and the ErrorBoundary (#5).
