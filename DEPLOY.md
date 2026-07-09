# Fresh Deployment Guide — BM Xpress Landing Page

This walks through a clean deploy: **new GitHub repo → new Vercel project → existing Supabase projects**.

No new Supabase project is needed. Both existing projects are already fully configured (tables, RLS policies, storage bucket, tracking function). You only need to point the site at them via environment variables.

---

## ⚠️ Before you start: wake up the dispatch database

The **BMX Dispatch** project (`azcuzqpmfobseskstteo`) appears to be **paused**. Supabase auto-pauses free-tier projects after about a week of inactivity.

If it stays paused, the site still works fine — but the live counter shows "Offline" and shipment tracking says it's temporarily unavailable.

**To fix:** go to [supabase.com/dashboard](https://supabase.com/dashboard), open the BMX Dispatch project, and click **Restore** / **Resume**. It takes a couple of minutes.

---

## Step 1 — Create a fresh GitHub repo

1. Go to [github.com/new](https://github.com/new)
2. Name it (e.g. `bm-xpress-site`)
3. **Do NOT** check "Add a README", "Add .gitignore", or "Choose a license" — leave it completely empty
4. Click **Create repository**

## Step 2 — Push the code

Extract the project zip, open a terminal **inside the extracted `bmxpress` folder**, then:

```bash
# Confirm you're in the right folder — you should see src, package.json, .gitignore
ls

git init
git add .

# Sanity check: should show src/app/page.tsx and friends.
# Should NOT show node_modules, .next, or .env.local
git status --short | head -20

git commit -m "BM Xpress landing page"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

**Authentication:** GitHub no longer accepts account passwords over HTTPS. When prompted for a password, paste a **Personal Access Token** instead — create one at [github.com/settings/tokens](https://github.com/settings/tokens) with `repo` scope.

**Prefer a GUI?** Use [GitHub Desktop](https://desktop.github.com/): clone the empty repo, copy the project files into the cloned folder, commit, push. This avoids the folder-flattening problem that browser drag-and-drop uploads cause.

### ✅ Verify the push worked

Open your repo on github.com. You should see a **`src` folder**, not a flat pile of `.tsx` files. If you see loose `.tsx` files at the root, the folder structure was lost and Vercel's build will fail with `Couldn't find any 'pages' or 'app' directory`.

---

## Step 3 — Create a fresh Vercel project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your new GitHub repo
3. Vercel auto-detects Next.js — leave Framework Preset, Build Command, and Output Directory at their defaults
4. Leave **Root Directory** as `./`
5. **Before clicking Deploy**, expand **Environment Variables** and add all four below

---

## Step 4 — Environment variables

Add these to Vercel (and to a local `.env.local` if you're running `npm run dev`).

All four are `NEXT_PUBLIC_*` and safe to expose publicly — they're anon keys, and access is controlled entirely by row-level-security policies on the database side.

### Marketing site database — contact form, partner applications, admin login

```
NEXT_PUBLIC_SUPABASE_URL=https://aamofkqdmqtpnqdxximh.supabase.co
```

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhbW9ma3FkbXF0cG5xZHh4aW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NDIzNzcsImV4cCI6MjA5ODIxODM3N30.bm3e0tieHgO5eD4pXywVt1H1geVHuhQj3e_k0AKkKMg
```

### BMX Dispatch database — live counter and shipment tracking (read-only)

```
NEXT_PUBLIC_DISPATCH_SUPABASE_URL=https://azcuzqpmfobseskstteo.supabase.co
```

```
NEXT_PUBLIC_DISPATCH_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6Y3V6cXBtZm9ic2Vza3N0dGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4OTk1OTcsImV4cCI6MjA5ODQ3NTU5N30.Cxlcs846GpY-x_CSD69sFGDhU1WeU_hLfkYuOAlXo88
```

### Optional — Google Search Console verification

Leave blank unless you've verified the domain. See the main README for how to get this value.

```
GOOGLE_SITE_VERIFICATION=
```

Now click **Deploy**.

---

## Step 5 — Create your admin login

The `/admin` page uses Supabase Auth on the **marketing** project. To give yourself access:

1. Supabase Dashboard → open **BMX RIDER PANEL** (`aamofkqdmqtpnqdxximh`)
2. **Authentication → Users → Add user**
3. Enter an email and password, and tick **Auto Confirm User**
4. Sign in at `your-site.vercel.app/admin`

---

## Step 6 — Post-deploy checklist

Open your live site and confirm:

- [ ] Background is **white**, text is **black**, cards have a frosted **glass** effect
- [ ] Homepage loads with the 3D globe in the hero
- [ ] **Live counter** shows real numbers (if it says "Offline", the dispatch DB is still paused — see the warning at the top)
- [ ] `/track` — search a real tracking number (e.g. one from your dispatch DB) and confirm the timeline appears
- [ ] `/apply` — submit a test partner application, then confirm the row appears in Supabase → `delivery_partner_applications`
- [ ] Contact form on the homepage — submit a test, confirm it lands in `contact_submissions`
- [ ] `/admin` — sign in and see both submissions
- [ ] `/sitemap.xml` loads and lists all pages

---

## What's already configured in Supabase (nothing to redo)

**BMX RIDER PANEL** (`aamofkqdmqtpnqdxximh`)
- `contact_submissions` table + RLS (anyone can insert, only signed-in can read)
- `delivery_partner_applications` table + RLS (same pattern)
- `partner-documents` private storage bucket (public upload, authenticated-only read)

**BMX Dispatch** (`azcuzqpmfobseskstteo`)
- `public_live_stats` aggregate table, Realtime-enabled, readable by anon (no PII)
- `track_shipment()` function — returns one order's customer-safe fields by exact tracking number or phone match
- Every other table (`orders`, `riders`, `cod_ledger`, etc.) is **hard-blocked** from the anon key at the database permission level

---

## Known limitations

- **Live map with rider GPS** is not built — it needs a Google Maps API key on your own billing account.
- **Admin panel is basic** (view leads + applications). Role-based access, CMS for logos/testimonials/blog, and analytics are not built yet.
- **Client logos are text wordmarks.** Drop real logo files into `public/logos/` and add a `src` to each entry in `src/lib/data.ts` — but only use logos you have permission to display.
- **Live counter numbers will be small** — the dispatch DB currently holds a handful of test orders and riders. They'll grow as real usage does. This is the honest tradeoff of showing real data instead of invented numbers.
