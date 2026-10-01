# Graph Report - clawkit_website  (2026-10-01)

## Corpus Check
- Corpus is ~29,593 words - fits in a single context window. You may not need a graph.

## Summary
- 467 nodes · 1018 edges · 19 communities (15 shown, 4 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.85)
- Token cost: 154,595 input · 0 output

## Community Hubs (Navigation)
- Server Core & Auth Services
- Next.js App Shell & Metadata
- Admin & Auth Pages
- Server Dependencies
- Express Middleware & Routes
- Client Dependencies
- Project Docs & Deployment
- Layouts & Admin Shell
- Homepage Marketing Sections
- Legal Pages
- Database Schema
- App Icon Branding
- Logo Branding
- Path Alias Config
- Dog Illustration Imagery
- ESLint Config
- Next Config

## God Nodes (most connected - your core abstractions)
1. `next` - 22 edges
2. `Button()` - 22 edges
3. `lucide-react` - 18 edges
4. `ok()` - 18 edges
5. `errorMessage()` - 15 edges
6. `ApiError` - 14 edges
7. `Alert()` - 13 edges
8. `react` - 12 edges
9. `ContactForm()` - 11 edges
10. `login()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `postgres service (postgres:16-alpine)` --semantically_similar_to--> `Neon database (production/development branches)`  [INFERRED] [semantically similar]
  docker-compose.yml → docs/DEPLOYMENT.md
- `server live-reload override (migrate deploy + npm run dev)` --semantically_similar_to--> `Manual migrations + admin seed from Render Shell`  [INFERRED] [semantically similar]
  docker-compose.override.yml → docs/DEPLOYMENT.md
- `PR Checklist (build, check, env, migration, secrets)` --references--> `Never commit .env; document vars in .env.example`  [INFERRED]
  .github/pull_request_template.md → CLAUDE.md
- `CI client job (lint, build)` --shares_data_with--> `Vercel deployment for client`  [INFERRED]
  .github/workflows/ci.yml → docs/DEPLOYMENT.md
- `Release 0.1.0 (initial scaffold)` --references--> `Frame-sequence hero`  [INFERRED]
  CHANGELOG.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Production deployment topology (Vercel + Render + Neon + DNS)** — docs_deployment_vercel_client, docs_deployment_render_api, docs_deployment_neon_database, docs_deployment_dns, docs_deployment_client_url_constraint [EXTRACTED 1.00]
- **Local Docker Compose stack** — docker_compose_postgres_service, docker_compose_server_service, docker_compose_client_service, docker_compose_override_server_live_reload [EXTRACTED 1.00]
- **Admin authentication flow** — claude_jwt_refresh_rotation, claude_client_service_layer, readme_admin_panel, docs_deployment_client_url_constraint [INFERRED 0.85]
- **CLAWKIT brand identity: paw + clock = pet health timing** — client_public_images_clawkit_icon_paw_print_motif, client_public_images_clawkit_icon_clock_face_motif, client_public_images_clawkit_icon_blue_brand_palette [INFERRED 0.85]

## Communities (19 total, 4 thin omitted)

### Community 0 - "Server Core & Auth Services"
Cohesion: 0.06
Nodes (58): ref_node_crypto, nodemailer, server, REFRESH_COOKIE, refreshCookieOptions(), connectDB(), prisma, env (+50 more)

### Community 1 - "Next.js App Shell & Metadata"
Cohesion: 0.06
Nodes (44): AppleIcon(), contentType, size, metadata, display, metadata, RootLayout(), sans (+36 more)

### Community 2 - "Admin & Auth Pages"
Cohesion: 0.10
Nodes (43): AdminMessagesPage(), formatDateTime(), AdminSubscribersPage(), ForgotPasswordPage(), schema, LoginPage(), schema, ResetForm() (+35 more)

### Community 3 - "Server Dependencies"
Cohesion: 0.05
Nodes (38): bcryptjs, dotenv, jsonwebtoken, prisma, @prisma/client, winston, dependencies, bcryptjs (+30 more)

### Community 4 - "Express Middleware & Routes"
Cohesion: 0.11
Nodes (24): cookie-parser, cors, express, express-rate-limit, helmet, app, authLimiter, formLimiter (+16 more)

### Community 5 - "Client Dependencies"
Cohesion: 0.06
Nodes (32): dependencies, axios, @hookform/resolvers, lucide-react, next, react, react-dom, react-hook-form (+24 more)

### Community 6 - "Project Docs & Deployment"
Cohesion: 0.09
Nodes (29): PR Checklist (build, check, env, migration, secrets), CI Workflow, CI client job (lint, build), CI server job (prisma validate/generate, npm run check), Release 0.1.0 (initial scaffold), CLAWKIT website notes for Claude, Client service layer + single-flight 401 refresh, Never commit .env; document vars in .env.example (+21 more)

### Community 7 - "Layouts & Admin Shell"
Cohesion: 0.16
Nodes (18): AdminLayout(), metadata, metadata, NotFound(), SiteLayout(), AdminRoute(), AdminShell(), links (+10 more)

### Community 8 - "Homepage Marketing Sections"
Cohesion: 0.15
Nodes (16): HomePage(), jsonLd, ClawkitHero(), navLinks, steps, Faq(), Features, HowItWorks() (+8 more)

### Community 9 - "Legal Pages"
Cohesion: 0.20
Nodes (14): ContactCard(), metadata, pad(), SectionHeading(), TermsPage(), tocItems, Callout(), CALLOUTS (+6 more)

### Community 10 - "Database Schema"
Cohesion: 0.29
Nodes (11): "ContactMessage", ContactMessage_createdAt_idx, "RefreshToken", RefreshToken_family_idx, RefreshToken_tokenHash_key, RefreshToken_userId_idx, "Subscriber", Subscriber_email_key (+3 more)

### Community 11 - "App Icon Branding"
Cohesion: 0.60
Nodes (5): CLAWKIT App Icon, Blue Flat Brand Palette, Clock Face Motif, Paw Print Motif, Dog Seizure Timing / Tracking

### Community 12 - "Logo Branding"
Cohesion: 0.40
Nodes (5): Navy and Light Blue Brand Palette, CLAWKIT Two-Tone Blue Wordmark, Dog Seizure Timing / Tracking Concept, CLAWKIT Logo, Paw Print Clock Emblem

### Community 13 - "Path Alias Config"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, paths

### Community 14 - "Dog Illustration Imagery"
Cohesion: 0.67
Nodes (4): Dog Running Illustration, CLAWKIT Dog-Wellbeing Brand Imagery, Flat Warm-Toned Illustration Style, Golden Retriever Running (Healthy Active Dog)

## Knowledge Gaps
- **116 isolated node(s):** `extends`, `next/core-web-vitals`, `baseUrl`, `paths`, `nextConfig` (+111 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 144 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Layouts & Admin Shell` to `Next.js App Shell & Metadata`, `Admin & Auth Pages`, `Client Dependencies`, `Homepage Marketing Sections`, `Legal Pages`?**
  _High betweenness centrality (0.174) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `Admin & Auth Pages` to `Next.js App Shell & Metadata`, `Client Dependencies`, `Layouts & Admin Shell`, `Homepage Marketing Sections`, `Legal Pages`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Why does `express` connect `Express Middleware & Routes` to `Server Dependencies`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **What connects `extends`, `next/core-web-vitals`, `baseUrl` to the rest of the system?**
  _116 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Server Core & Auth Services` be split into smaller, more focused modules?**
  _Cohesion score 0.059644322845417236 - nodes in this community are weakly interconnected._
- **Should `Next.js App Shell & Metadata` be split into smaller, more focused modules?**
  _Cohesion score 0.05794556628621598 - nodes in this community are weakly interconnected._
- **Should `Admin & Auth Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.09970238095238096 - nodes in this community are weakly interconnected._