# BBSystems.US Website

Website project for **BBSystems.US** — IT Consulting, PC Repair, and Custom Computer builds, run by Cruz Gregory in Pierceton, IN.

## Known business info (from Google Maps listing)

- **Name:** BBSystems.US — IT Consulting, PC Repair, Custom Computers & More!
- **Category:** Computer store
- **Address:** 820 W Tower St, Pierceton, IN 46562
- **Phone:** (260) 248-1269
- **Hours:** Open 24 hours (as listed)
- **Rating:** 5.0 on Google (review count not shown in the unauthenticated listing view — worth double-checking)
- **Current website:** none on file with Google (listing has an "Add website" prompt)

This is all public info pulled from the Google Maps listing on 2026-08-15. Cruz should confirm it's still accurate before it goes on the site — hours and phone especially.

## Status

Nothing built yet. This repo exists so Cruz has a place to drop content, and so we have a home to build against once we've nailed down direction.

## What we need from Cruz

Drop answers to these in a new file (`INTAKE.md`, an issue, whatever's easiest) or just talk it through with Ryan:

### Content
1. Logo / brand assets — does he have any, or do we need to make something simple?
2. Services list — what should be on the site? (e.g. PC building/repair, IT consulting, managed services, networking, on-site vs remote, business vs residential, etc.)
3. Photos — of builds, the shop, before/afters — anything usable?
4. Pricing — list rates/packages, or keep it "contact for quote"?
5. About / bio blurb — how much does he want to share about himself and the business?
6. Service area — just Pierceton, or a wider radius (Warsaw, Kosciusko County, etc.)?
7. Contact preference — phone, email, contact form, social media?
8. Testimonials/reviews — okay to pull quotes from Google reviews, or does he want to supply his own?

### Technical
9. **Framework** — he's used WordPress before but isn't locked into it. Given this is a small, mostly-static business site (services, contact, maybe a portfolio of builds), a static site generator (e.g. Astro, 11ty, or even a plain static HTML/CSS build) is likely simpler to host and maintain than WordPress. Worth asking if he has a preference or wants to learn something specific.
10. **Hosting** — not decided yet. Leading candidates:
    - **GitHub Pages** — free, dead simple for a static site, ties directly to this repo.
    - **Cloudflare Pages** — free, fast, easy custom domain + SSL, slightly more flexible if we want serverless functions later (e.g. a contact form).
    - Either works fine for a site this size; Cloudflare Pages has a slight edge if a contact form or any dynamic bits come up later.
11. **Domain** — he already owns bbsystems.us; it's currently just routing to the Google Maps listing. Ryan will handle re-pointing it once hosting is picked (see below).
12. **Contact form** — does he want visitors to be able to submit a form, or is a phone/email link enough?

## Domain setup (Ryan handling this part)

Cruz owns **bbsystems.us** already — it's just redirecting to the Google Maps listing right now, not doing anything DNS-wise for a real site. Once hosting is decided, here's what's needed to point it at the new site instead. Cruz doesn't need to do the technical work himself — he just needs to either hand over registrar/DNS access, or make a couple of DNS edits Ryan hands him.

**What to get from Cruz first:**
- Who the domain is registered with (GoDaddy, Namecheap, Google Domains/Squarespace, etc.) and whether he still has login access.
- Either: (a) log in and add Ryan as an authorized user / grant DNS access, or (b) Ryan gives him the exact DNS records to paste in, or (c) Cruz gives Ryan temporary login credentials directly (least preferred — avoid handling his password if possible, have him add the records himself or grant proper access instead).

### If hosting on GitHub Pages
1. In the repo: Settings → Pages → set the custom domain to `bbsystems.us` (and `www.bbsystems.us` if desired). GitHub generates a `CNAME` file in the repo automatically.
2. At the registrar, set DNS records at the apex (`bbsystems.us`):
   - Four `A` records pointing to GitHub's Pages IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Optional `CNAME` record for `www` → `rh7112.github.io`
3. Back in repo Settings → Pages, enable "Enforce HTTPS" once DNS propagates (can take a few hours).

### If hosting on Cloudflare Pages
1. Create/log into a Cloudflare account, add `bbsystems.us` as a site.
2. Cloudflare will want the domain's **nameservers** changed at the registrar to Cloudflare's (e.g. `xxx.ns.cloudflare.com`) — this moves DNS management to Cloudflare entirely, which also unlocks their free CDN/SSL. This is the biggest step and needs either registrar access or Cruz making the nameserver change himself.
3. Once the domain is active in Cloudflare, create a Pages project connected to this repo, then add `bbsystems.us` as a Custom Domain on the Pages project — Cloudflare wires up the DNS records automatically since it now controls the zone.
4. SSL/HTTPS is automatic through Cloudflare.

Cloudflare Pages requires the bigger handoff (nameserver change) but is less fiddly afterward and gives us CDN/analytics/forms for free. GitHub Pages requires no nameserver change (just a few DNS records at the existing registrar) but is more bare-bones. Worth deciding hosting first, then only touching the domain once.

## Contributing

Cruz has push access to this repo — feel free to add files, images, notes, or open issues directly. No need to ask permission to drop things in; we'll sort/organize as it fills in.
