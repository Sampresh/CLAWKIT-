# Deployment

Domain: **clawkit.us** (site) and **api.clawkit.us** (API). URLs never end in a trailing slash.

## 1. Database — Neon

1. Create a project with two branches: `production` and `development`.
2. For each branch copy:
   - the **pooled** connection string → `DATABASE_URL`
   - the **direct** connection string → `DIRECT_URL`
3. Never point a local `prisma migrate dev` at the production branch.

## 2. API — Render (native Node, not Docker)

New **Web Service** from this repo:

| Setting | Value |
| --- | --- |
| Root directory | `server` |
| Runtime | Node (version from `server/.node-version` = 20) |
| Build command | `npm ci && npx prisma generate` |
| Start command | `node index.js` |
| Health check path | `/health` |
| Instance | paid (no cold starts) |
| Region | same region as the Neon database |

Environment variables (server only):

```
NODE_ENV=production
DATABASE_URL=<neon pooled, production branch>
DIRECT_URL=<neon direct, production branch>
CLIENT_URL=https://clawkit.us
SERVER_PUBLIC_URL=https://api.clawkit.us
FORCE_HTTPS=true
JWT_ACCESS_SECRET=<64+ random hex chars>
JWT_REFRESH_SECRET=<different 64+ random hex chars>
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS
FROM_EMAIL=hello@clawkit.us
FROM_NAME=CLAWKIT
ADMIN_EMAIL=<your admin email>
ADMIN_PASSWORD=<strong password, 12+ chars>
```

Generate secrets with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.

**Migrations are run by hand** from the Render Shell after a deploy that changes the schema:

```bash
npx prisma migrate deploy
node prisma/seed.js        # first deploy only — creates the admin
```

After seeding you can remove `ADMIN_PASSWORD` from Render.

## 3. Client — Vercel

| Setting | Value |
| --- | --- |
| Root directory | `client` |
| Framework | Next.js |

Environment variables (client only — no server secrets here):

```
NEXT_PUBLIC_API_URL=https://api.clawkit.us/api/v1
NEXT_PUBLIC_SITE_URL=https://clawkit.us
NEXT_PUBLIC_APP_STORE_URL=<App Store listing>
NEXT_PUBLIC_PLAY_STORE_URL=<Google Play listing>
```

## 4. DNS

| Record | Name | Value |
| --- | --- | --- |
| A | `@` (clawkit.us) | Vercel IP (shown in Vercel → Domains) |
| CNAME | `www` | `cname.vercel-dns.com` — set in Vercel to **308 redirect to clawkit.us** |
| CNAME | `api` | `<service>.onrender.com` — add `api.clawkit.us` as a custom domain in Render |

`CLIENT_URL` must exactly equal `https://clawkit.us` (apex, no www), or CORS and the refresh cookie will fail.

## 5. After first deploy

- [ ] `https://api.clawkit.us/health` returns `{"status":"ok"}`
- [ ] Contact form on https://clawkit.us/contact arrives in `ADMIN_EMAIL`
- [ ] Log in at https://clawkit.us/login, check `/admin`
- [ ] Forgot-password email arrives and the link works
- [ ] `https://clawkit.us/robots.txt` and `/sitemap.xml` use the production domain
