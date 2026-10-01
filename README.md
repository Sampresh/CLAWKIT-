# CLAWKIT website

Marketing site and small API for **CLAWKIT**, the dog seizure tracker for iOS and Android. Production: https://clawkit.us

| Part | Stack | Host |
| --- | --- | --- |
| `client/` | Next.js 14 (App Router, JS), Tailwind 3, TanStack Query, Zustand, axios, react-hook-form, zod | Vercel |
| `server/` | Node 20, Express 5 (ESM), Prisma 6, Zod, JWT, Nodemailer | Render |
| Database | PostgreSQL | Neon |

## What it does

- **Public site:** scroll-driven frame-sequence hero, features, how it works, download (App Store / Google Play), FAQ, about, blog, contact, privacy, terms.
- **API:** contact form (stored + emailed to `ADMIN_EMAIL`), newsletter signup, admin auth.
- **Admin** (`/admin`): read/delete contact messages, view/export/delete newsletter subscribers. There is no public sign-up; the only account is the seeded admin.

## Run locally

### Option A — Docker

```bash
cp .env.example .env          # fill JWT secrets at minimum
docker compose up --build     # client :3000, API :5001, Postgres :5432
docker compose exec server node prisma/seed.js
```

### Option B — Node directly

Needs a local Postgres (or a Neon dev branch) in `DATABASE_URL`/`DIRECT_URL`.

```bash
cp .env.example .env && ln -s ../.env server/.env   # Prisma CLI reads server/.env
cp client/.env.example client/.env.local

cd server && npm install && npx prisma migrate dev && npm run db:seed && npm run dev   # :5001
cd client && npm install && npm run dev                                               # :3000
```

Admin login: http://localhost:3000/login with `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
Without `SMTP_HOST`, emails (contact notifications, password resets) are printed to the API log.

## Customising

- **Store links:** `NEXT_PUBLIC_APP_STORE_URL`, `NEXT_PUBLIC_PLAY_STORE_URL`.
- **Hero frames:** `client/src/lib/heroFrames.js`. It currently steps through 8 Unsplash dog photos. For a smooth animation, export a video to `client/public/frames/frame_0001.jpg…` and flip `USE_LOCAL_FRAMES`.
- **Hero copy / step cards:** `client/src/components/home/ClawkitHero.jsx`.
- **FAQ:** `client/src/content/faq.js`. **Blog posts:** `client/src/content/posts.js`.
- **Design tokens:** CSS variables in `client/src/styles/globals.css` (mirrored in `tailwind.config.js`).

## Scripts

| Where | Command | What |
| --- | --- | --- |
| client | `npm run dev` / `build` / `lint` | Next.js |
| server | `npm run dev` | API with `--watch` |
| server | `npm run check` | `node --check` on every server file |
| server | `npm run db:migrate` | create/apply a migration (dev DB only) |
| server | `npm run db:deploy` | apply migrations (prod) |
| server | `npm run db:seed` | create the admin user |

Deployment: see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).
