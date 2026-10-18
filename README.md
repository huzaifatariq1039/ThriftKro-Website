# Thrift Kro Website

The Thrift Kro frontend is a React and TypeScript single-page application for buyers, sellers, and administrators. It uses the backend API for authentication and application data; browser route guards are a user-experience layer, not a security boundary.

## Stack

- React 18 and TypeScript
- Vite 6
- React Router 7
- Zustand 5
- Tailwind CSS 4
- Sonner, Lucide React, and Recharts

## Prerequisites

- Node.js compatible with the committed lockfile
- The backend running and migrated against PostgreSQL
- A local environment file based on `.env.example`

Configure the versioned API prefix:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

Do not place database passwords, backend signing secrets, or other server credentials in a `VITE_` variable. Vite exposes those values to the browser bundle.

## Local development

```powershell
cd D:\FYP\Website
npm ci
npm run dev
```

Vite prints the local URL, normally `http://localhost:5173`.

Run the full frontend quality gate before committing:

```powershell
npm run check
```

That command runs TypeScript checking, frontend contract tests, and the production build.

## Current structure

```text
src/
  components/        shared route and UI components
  contexts/          authenticated session state
  features/          buyer, seller, admin, auth, landing, and public pages
  layouts/           top-level application layouts
  services/api/      backend service clients
  store/             shared client state
  router.tsx         browser routes and protected route composition
tests/                frontend contract tests
```

## Authentication and authorization

Buyer, seller, and administrator sign-in calls the backend. No default or demo administrator account is provisioned by the current application. Create and manage real accounts through approved backend operations; do not publish credentials in source code or documentation.

Frontend protected routes improve navigation behavior, but every authorization decision must remain enforced by the backend. The current client persists access tokens in browser storage; this is a known security limitation tracked separately from this documentation update.

## Backend contract

- API requests use `VITE_API_URL` and the `/api/v1` backend prefix.
- A `401` response clears the local session and returns the user to authentication.
- Backend responses, generated OpenAPI, and backend tests are authoritative when fixture or presentation data disagrees.
- Administrator reporting distinguishes buyer checkouts from per-seller orders.
- Wallet and cash-on-delivery flows are supported. Card payments remain unavailable until a verified provider is integrated.

## Release boundaries

AI product verification and virtual try-on are deferred and must not be presented as approved production features. The VTON engine is intentionally not being implemented during this phase while a replacement AI architecture is designed.

Some presentation screens may still contain fixture data. Do not treat fixture values as persisted backend records or production credentials.

## Production build and deployment

```powershell
npm run build
npm run preview
```

The production output is written to `dist/`. `vercel.json` rewrites browser routes to `index.html`; configure the production `VITE_API_URL` in the deployment environment before building.
