# Velzora

E-commerce storefront built with **Next.js (App Router)**, React 19, Tailwind CSS v4, Zustand, Framer Motion, and Axios.
## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

## Environment

Copy `.env.example` to `.env.local`.

| Variable | Used by | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | every API call (`src/lib/apiBase.js`: api client, login, reviews, addresses) | `http://localhost:3001/api` |

Run the Velzora backend locally (port 3001) before starting the storefront.

## Structure

- `src/app` - App Router routes (`page.jsx` per route), root layout, `AppShell` (header, footer, providers) and `not-found`.
- `src/views` - page components (previously `src/pages`; renamed because Next reserves that folder).
- `src/lib/router.js` - `useNavigate`, `useLocation`, `useSearchParams`, `useParams`, `NavLink`, `Navigate` on top of `next/navigation`.
- `src/components`, `src/store`, `src/services`, `src/context`, `src/locales` - unchanged.

The storefront reads auth, cart, wishlist and language from `localStorage` while rendering, so `AppShell` is rendered client-side only (same behavior as the former SPA).
