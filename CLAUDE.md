# CLAWKIT website — notes for Claude

Marketing site + small API for the CLAWKIT dog seizure tracker app. Built from the fullstack-web-scaffold standard; payments, uploads, cron, Redis and public user accounts were deliberately left out. Don't add stubs for them.

## Run

- API: `cd server && npm run dev` → http://localhost:5001 (health: `/health`, routes under `/api/v1`)
- Client: `cd client && npm run dev` → http://localhost:3000
- Docker: `docker compose up --build` (client 3000, server 5001, postgres 5432)
- Verify: `cd client && npm run lint && npm run build`; `cd server && npm run check`

## Layout

- `server/src/app.js` — middleware order: helmet → trust proxy → HTTPS redirect → CORS → json → cookies → rate limit → /health → /api/v1 → 404 → errorHandler
- Layering: route → middleware → validator (zod) → controller → Prisma/service. Routes hold no logic.
- Routes: `auth` (login, refresh, logout, me, forgot/reset password), `content` (contact, newsletter), `admin` (stats, messages, subscribers; all behind `verifyToken, requireAdmin`).
- Auth: HS256 JWT access token (15m, memory only on client), refresh token in httpOnly cookie scoped to `/api/v1/auth`, hashed in `RefreshToken`, rotated with reuse detection per family.
- Client: components call `src/services/index.js`, never axios directly. `src/services/api.js` refreshes once on 401 with a shared promise. Only auth state lives in Zustand (`src/store/authStore.js`); server data uses TanStack Query.
- Hero: `src/components/ui/frame-sequence-hero.jsx` (styles `.fsh-*` in `globals.css`), configured in `src/components/home/ClawkitHero.jsx` and `src/lib/heroFrames.js`.
- Content (FAQ, blog) is static in `client/src/content/`.

## Rules

- Never commit `.env`; add every new variable to `.env.example` with a comment.
- Contact/newsletter forms carry a `website` honeypot; keep the client zod schema in sync with `server/src/validators/content.validators.js`.
