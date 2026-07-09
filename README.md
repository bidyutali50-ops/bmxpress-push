# BM Xpress — Logistics Landing Page

Production-ready marketing site for **BM Xpress Logistics Private Limited**, built with Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Three.js (via React Three Fiber), GSAP-ready animation hooks, and Lenis smooth scroll. Contact form submissions are stored in Supabase, with a lightweight `/admin` dashboard to view leads.

## What's inside

- **Hero** — full-screen 3D globe (Three.js/R3F) with glowing delivery routes, an orbiting rider marker, a starfield background, and animated stat counters.
- **Trusted By** — infinite logo marquee.
- **Services** — 8 tilt-on-hover glass cards.
- **Live Tracking** — a mock live shipment dashboard: animated route line, moving rider dot, and a timeline that auto-advances.
- **Coverage** — an interactive schematic map of West Bengal hubs (Murshidabad, Kolkata, Howrah, Hooghly, Malda, Asansol, Durgapur, Nadia) with hover tooltips.
- **Features / Why Choose Us / Numbers** — animated grids and counters.
- **Testimonials** — auto-sliding quote carousel.
- **Contact** — form that writes to a `contact_submissions` table in Supabase, with success/error states.
- **`/admin`** — email/password-gated dashboard (Supabase Auth) listing every lead.
- **SEO** — metadata, Open Graph/Twitter cards, JSON-LD `LocalBusiness` schema, dynamic `sitemap.xml` and `robots.txt`.
- Dark/light theme toggle, custom cursor, animated logo-reveal loading screen, reduced-motion support, and keyboard focus states.

## 1. Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 2. Connect Supabase (already provisioned)

A `contact_submissions` table has already been created in your existing Supabase project (the same one used by BM Xpress Rider Panel) with row-level security:
- Anyone can **insert** (submit the contact form).
- Only **signed-in** users can **read** leads (used by `/admin`).

Copy `.env.example` to `.env.local` and fill in your project's URL and anon/publishable key (Supabase Dashboard → **Project Settings → API**):

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://aamofkqdmqtpnqdxximh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhbW9ma3FkbXF0cG5xZHh4aW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NDIzNzcsImV4cCI6MjA5ODIxODM3N30.bm3e0tieHgO5eD4pXywVt1H1geVHuhQj3e_k0AKkKMg
```

This anon key is safe to expose publicly — it only allows what the row-level-security policies above explicitly permit (insert leads, or read leads if signed in).

### Create an admin login

`/admin` uses Supabase Auth (separate from the rider app's phone-login). To create yourself an admin account:
1. Supabase Dashboard → **Authentication → Users → Add user**.
2. Enter an email and password, and make sure "Auto Confirm User" is checked.
3. Sign in at `yoursite.com/admin` with that email and password.

## 3. Deploy to Vercel

The easiest path since this is a full Next.js app (not a static HTML file):

1. Push this folder to a new GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import that repository.
3. Add the two environment variables from `.env.local` in Vercel's project settings.
4. Deploy. Vercel handles builds, image optimization and edge caching automatically.

## 4. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: BM Xpress landing page"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Project structure

```
src/
  app/                # Routes: /, /admin, sitemap.ts, robots.ts, layout.tsx
  components/
    layout/            # Navbar, Footer, theme toggle, cursor, loading screen, smooth scroll
    sections/          # One file per landing-page section
    three/              # Globe + starfield (React Three Fiber)
    ui/                # Small shadcn-style primitives (button, card, input…)
  hooks/               # useCounter, useInView
  lib/                 # site content/data, Supabase client, cn() helper
```

## SEO content pages (added for search ranking)

Beyond the one-page site, there are now three sections built specifically to rank in Google:

- **`/services` + 8 service pages** (`/services/hyperlocal-delivery`, `/services/3pl-logistics`, etc.) — each with unique copy, use cases, FAQs, and `Service` + `FAQPage` structured data.
- **`/areas` + 8 district pages** (`/areas/murshidabad`, `/areas/kolkata`, etc.) — unique local content per district, cross-linked to services, with `LocalBusiness` structured data per area.
- **`/blog` + 3 starter posts** — genuinely useful, non-templated articles on delivery operations (same-day vs next-day, COD reconciliation, choosing a delivery partner) with `BlogPosting` structured data.

All 23 pages are statically pre-rendered (fully crawlable HTML, not JS-dependent) and included in `sitemap.xml`. Content lives in `src/lib/services-content.ts`, `src/lib/areas-content.ts` and `src/lib/blog-content.ts` — edit those files directly to update copy, add a service, add a district, or publish a new post (no routing changes needed, pages are generated automatically from the data).

## Google Search Console setup

1. Go to [search.google.com/search-console](https://search.google.com/search-console) and add your domain as a property.
2. Choose the **HTML tag** verification method (not DNS — simpler for most people). It gives you a line like:
   ```html
   <meta name="google-site-verification" content="abc123..." />
   ```
   Copy just the `abc123...` part (the `content` value).
3. Add it to `.env.local` (and to your Vercel project's Environment Variables):
   ```
   GOOGLE_SITE_VERIFICATION=abc123...
   ```
4. Redeploy. The verification tag is now automatically included on every page.
5. Back in Search Console, click **Verify**.
6. Once verified, go to **Sitemaps** in the left sidebar, enter `sitemap.xml`, and submit it. Google will start crawling all 23 pages from there.

It typically takes a few days to a few weeks for new pages to show up in search results — this is normal.



- Stats (500+ riders, 200+ pincodes, 99% delivery success, etc.) and the four sample testimonials are placeholders from the original brief — swap them for real numbers in `src/lib/data.ts` whenever you have them.
- Trusted-by logos are rendered as text wordmarks (Flipkart, Pidge, Shiprocket, Adloggs, Manipal, ONDC) rather than actual logo image files, since using real brand marks without permission is a trademark risk — drop in official SVG/PNG logos from each partner once you have usage rights.
- The Coverage map is a stylised schematic network (not literal district geography) so it doubles as a distinctive visual signature for the page.
