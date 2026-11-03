# Session 20 — Exercise 2: Debugging a "Failed to fetch" Error

**Status: documented, not applied.** The fix below is a study note — no source code was changed.

---

## 1. The Bug

**Reproduction:**

1. Open the app (`npm run dev`)
2. DevTools → Network tab → check **Offline**
3. Reload the page

**Symptoms:**

- The Network tab shows **3 failed requests** to `dummyjson.com` (not 1)
- After ~3 seconds the page displays:

```
Error: Failed to fetch
```

- Console shows:

```
TypeError: Failed to fetch
    at apiClient (src/api/client.js:97)
```

---

## 2. Root-Cause Chain

Three pieces of the existing code combine to produce this exact behavior:

1. **`src/api/client.js:96-100`** — `fetch(url, config)` is called with **no try/catch**.
   `fetch` only rejects on *network-level* failure (offline, DNS, CORS). HTTP errors
   like 404 do NOT reject — those are handled manually at line 111 with the
   `response.ok` check. Network failures slip past the `ApiError` wrapper entirely
   and propagate as a raw `TypeError`.

2. **`src/main.jsx:111`** — `retry: 2` makes TanStack Query retry twice with backoff.
   That is why there are **3 requests** total, and why the error takes ~3s to appear
   instead of failing fast. (Retrying transient network blips is reasonable — this
   part is working as designed.)

3. **UI error branches** (`src/pages/Home.jsx:671-685`, `src/pages/ProductDetails.jsx:209-223`)
   render `error?.message` verbatim — so the user sees the raw English `TypeError`
   text, untranslated, with no actionable information.

**Root cause:** network-level failures bypass the custom `ApiError` class, so the
app cannot distinguish "server said 404" from "you are offline".

---

## 3. Proposed Fix (documented, NOT applied)

In `src/api/client.js`, wrap the `fetch` call:

```js
// ==================================================
// SEND REQUEST
// ==================================================

/*
  fetch() fails in two different ways:

  1. NETWORK PROBLEM
  → fetch() itself throws
  (offline, DNS error, server down)

  2. HTTP ERROR (404, 500)
  → fetch() does NOT throw
  → we check response.ok below
*/

let response;


try {

  response =
    await fetch(
      url,
      config
    );

} catch (networkError) {

  // We never reached the server.

  throw new ApiError(
    'Network error: check your connection',
    0,
    null
  );

}
```

Everything after this point (`if (!response.ok)`, `response.json()`) stays untouched.

---

## 4. Line-by-Line Walkthrough

| # | Change | Why |
|---|--------|-----|
| 1 | `let response;` declared **outside** the `try` | `const` inside `try` would be block-scoped — the code after the catch could not see it. `let` keeps the declaration in function scope. |
| 2 | Comment block added **before** the code | Matches this file's teaching style: explain *why* before *what*. It documents the two failure modes permanently. |
| 3 | `try { ... }` wraps **only** the `fetch` call | The network can fail only at the moment of the request. The `response.ok` check below is plain logic — nothing to catch there. |
| 4 | `catch (networkError)` | Any `fetch` rejection lands here: `TypeError: Failed to fetch`, CORS blocks, DNS failures. |
| 5 | `throw new ApiError(...)` — rethrow, don't swallow | Downstream code (`Home.jsx:671`, `ProductDetails.jsx:209`) already knows how to render `error.message`. Converting to `ApiError` reuses the existing error path instead of adding a new one. |
| 6 | Message: `'Network error: check your connection'` | The raw `Failed to fetch` tells users nothing actionable. This one does. |
| 7 | `status: 0` | Real HTTP statuses start at 100. `0` = "request never got a response" — keeps `ApiError.status` meaningful for any future `.status` checks. |
| 8 | `data: null` | There is no server payload when the network failed; matches the constructor's expectations. |
| 9 | `networkError` is caught but **not used** | We replace it with a clearer error rather than logging or chaining it. |

---

## 5. Deliberately NOT Changed

- **`retry: 2` in `main.jsx`** — still retries 3 total attempts. Good: transient
  blips recover automatically. Trade-off: offline users wait ~3s before seeing the
  message. Acceptable.
- **`if (!response.ok)` block in `client.js`** — HTTP 404/500 handling is correct as-is.
- **UI components** — they render `error.message` already, so friendlier text would
  appear with zero changes there.
- **Optional future improvement** — a **Retry** button using TanStack's `refetch`
  in the two error UIs. Not part of this fix.

---

## 6. Verification Steps (if this fix is ever applied)

1. `npm run lint` — oxlint must stay clean (`react/rules-of-hooks` is an error)
2. `npm run build` — confirms no syntax/scope errors
3. Manual test: DevTools → Network → **Offline** → reload → expect
   **"Error: Network error: check your connection"** after ~3s instead of
   `Failed to fetch`
4. Re-enable network → reload → app works normally, no regression

---

## 7. Bonus Finding (future exercise)

While scanning for this bug, a second real issue was found:

**Symptom:** visiting `/products` (e.g. via the breadcrumb "Products" link)
silently redirects to `/` after 500ms.

**Suspected cause:** the search-debounce effect in `src/pages/Home.jsx:286-350`
runs on mount with an empty input and calls `navigate('/')` unconditionally.

Not investigated further — candidate for a later debugging exercise.
