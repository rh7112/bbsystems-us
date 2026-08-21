# BBSystems.US Website

Website project for **BBSystems.US** — IT Consulting, PC Repair, and Custom Computer builds, run by Cruz Gregory in Pierceton, IN.

## First things first, Cruz

You've been invited to this repo as a collaborator — check your email or [github.com/notifications](https://github.com/notifications) for the invite and accept it. Once you're in, you can push files, open issues, and edit this README directly.

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

A first pass at the site is underway in [`web/`](./web) — a SvelteKit app (static-rendered, so it can deploy to either GitHub Pages or Cloudflare Pages once hosting is picked). It uses Cruz's answers from `Questionaire.txt` and the photos/logo he uploaded to `assets/`: services copy, service area, and a build gallery are in; there's no shop/cart since he hasn't answered the marketplace questions yet (Q9-14) and his pricing answer ("determined live with customer") points away from needing one anyway. See [`web/README.md`](./web/README.md) for how to run it locally.

Still waiting on Cruz for the marketplace (Q9-14) and remaining technical (Q15-18) questions below before finalizing hosting/domain and deciding if any e-commerce is needed.

## What we need from Cruz

**Status: Questions 1–8 are answered — thank you! See `Questionaire.txt`.** Everything from Question 9 on is still open — no rush, answer whenever's convenient. Drop answers in `Questionaire.txt`, a new file, an issue, or just talk it through with Ryan.

### Content — ✅ answered, see `Questionaire.txt`
1. Logo / brand assets — does he have any, or do we need to make something simple?
2. Services list — what should be on the site? (e.g. PC building/repair, IT consulting, managed services, networking, on-site vs remote, business vs residential, etc.)
3. Photos — of builds, the shop, before/afters — anything usable?
4. Pricing — list rates/packages, or keep it "contact for quote"?
5. About / bio blurb — how much does he want to share about himself and the business?
6. Service area — just Pierceton, or a wider radius (Warsaw, Kosciusko County, etc.)?
7. Contact preference — phone, email, contact form, social media?
8. Testimonials/reviews — okay to pull quotes from Google reviews, or does he want to supply his own?

### Marketplace / selling online — ⬜ still open
This is the big open question — do NOT build any of this until he answers. It changes the hosting/framework decision.
9. Does he actually want to **sell things online** (pre-built PCs, parts, accessories), or is the site more "here's what I do, call/message me for a quote"? A lot of small IT/repair shops don't need a real cart — a services list + contact form covers it.
10. If selling: how many products, roughly? A handful of pre-built PC configs is very different from a real parts catalog with stock levels.
11. Does he need real **inventory tracking** (stock counts that go down as things sell), or is "take it down/mark sold manually when it sells" good enough?
12. Local pickup only, or shipping too?
13. Does he already take payments some other way (Square, PayPal, Venmo, Cash App) that we should just link to instead of building something new?
14. Repair/service bookings — does he want people to be able to schedule/request service online, separate from any product sales?

See "Keeping the marketplace piece free" below for what's actually realistic at $0/month.

### Technical — ⬜ still open
15. ~~**Framework**~~ — decided: the site is being built in **Svelte**.
16. **Hosting** — not decided yet. Leading candidates:
    - **GitHub Pages** — free, dead simple for a static site, ties directly to this repo.
    - **Cloudflare Pages** — free, fast, easy custom domain + SSL, slightly more flexible if we want serverless functions later (e.g. a contact form).
    - Either works fine for a site this size; Cloudflare Pages has a slight edge if a contact form or any dynamic bits come up later.
17. **Domain** — he owns bbsystems.us, but its DNS is currently broken (points nowhere real) and there's no email routing configured. Ryan is handling this — see "Domain setup" below, including a new question about Cloudflare access that's now the key blocker.
18. **Contact form** — does he want visitors to be able to submit a form, or is a phone/email link enough?

### One more, totally optional — the name
You told us you'd rather keep the site business-only, no personal bio, no life story — and that's exactly how it's being built. This is a separate, smaller thing: right now nothing on the site explains what "BB" stands for, and it's purely a branding question, not a personal one. Totally your call, no wrong answer:
- **Leave it unexplained** — plenty of businesses do, the logo carries the brand fine on its own.
- **One line, no story:** something like "BB = Bully-Built" near the logo or in the footer.
- **A little more:** a short caption on the logo/dog photo itself (not a bio, just naming what's in the image), if that ever feels right.

Whatever you're comfortable with — including nothing — works for us.

## Domain setup (Ryan handling this part)

**Update (2026-08-21) — checked the live WHOIS/DNS for bbsystems.us, and it changes the picture:**

- **Registrar is Squarespace Domains II LLC.** This matches Cruz's account of what happened: Google sold Google Domains to Squarespace in 2023, and bbsystems.us came along with that sale. The domain itself is registered fine — status active, registrant is Monte "Cruz" Gregory, expires December 21, 2026. It was not actually lost/resold to someone else.
- **Nameservers already point to Cloudflare** (`anirban.ns.cloudflare.com` / `oaklyn.ns.cloudflare.com`) — DNS for this domain is currently managed through *some* Cloudflare account, not through Squarespace directly. This is a big deal: if that account is still reachable, the "biggest step" of moving to Cloudflare Pages (the nameserver handoff described below) is likely **already done**.
- **The current A record is a private IP** (`192.168.68.50`) — not a real public address. The domain doesn't actually resolve to anything reachable on the internet right now. It is *not* redirecting to the Google Maps listing the way we'd assumed — it's just broken/pointing nowhere.
- **There's no MX record at all** — no mail routing configured. This lines up exactly with Cruz losing access to `support@bbsystems.us` and `admin@bbsystems.us`: whatever handled that mail (most likely free email forwarding or a Workspace account bundled with the old Google Domains setup) never carried over to Squarespace, or access to it broke in that migration.

**New question for Cruz, and it's now the most important one:** do you have access to the Cloudflare account that's currently running DNS for bbsystems.us (the one with nameservers `anirban.ns.cloudflare.com`/`oaklyn.ns.cloudflare.com`)? If yes, that one login unlocks both fixing the site's DNS *and* free email restoration (see below) in one place. If you don't recognize it or can't get back in, that's fine too — we can disconnect it and start DNS fresh, just a bit more setup work.

**What to get from Cruz first:**
- Whether he can log into that existing Cloudflare account (check `mcgregory08@gmail.com`/`bbsystemsus@gmail.com` for old Cloudflare welcome/verification emails if unsure).
- Separately, his **Squarespace** login (the actual registrar) — needed either way, since that's where nameservers get set if we start over, and it's also the account of record for the domain itself now.
- Either: (a) he logs in and adds Ryan as an authorized user / grants access, or (b) Ryan gives him exact steps/records to paste in himself, or (c) Cruz gives Ryan temporary login credentials directly (least preferred — avoid handling his password if possible, have him add the records himself or grant proper access instead).

### Restoring support@ and admin@ email (free)

Once there's access to whichever Cloudflare account controls the zone (existing or freshly set up), **Cloudflare Email Routing** is the free fix for the lost email addresses: it forwards `support@bbsystems.us` and `admin@bbsystems.us` straight to an existing inbox (e.g. his working `bbsystemsus@gmail.com`) with no paid mailbox, no Workspace subscription, and no server to run. Cruz keeps replying from his normal Gmail; the forward is invisible to whoever emails him. This also means he can go back to any of the "different sites" that have `admin@bbsystems.us` on file and actually receive their password-reset emails again.

This is a separate, lower-effort task from the hosting decision below — it just needs DNS access, not a finished site. Worth doing as soon as Cloudflare access is sorted, even before hosting is finalized.

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

## Keeping the marketplace piece free

Both Ryan and Cruz want this at $0/month — Ryan's doing the build for word-of-mouth, not a fee, so no paid plans, no monthly SaaS. A "real" marketplace (multi-vendor cart, live inventory database, admin dashboard) generally means paid hosting or a subscription (Shopify, Snipcart, WooCommerce-on-paid-hosting). We should avoid that unless Cruz's answers above make it unavoidable. Realistic free options, roughly in order of "how much actually needs building":

- **No product list, just contact/quote (cheapest, likely fits a repair/IT business):** No marketplace at all — a services page + phone/email/contact-form link. $0, zero ongoing management, works with plain GitHub Pages or Cloudflare Pages.
- **A few fixed items or service packages to buy/book online:** **Stripe Payment Links** or **PayPal "Buy Now" buttons** embedded directly on the page. Free to set up — no monthly fee, standard per-transaction processing fees only (that's the card networks, not us or him). "Managing" it means logging into Stripe/PayPal and editing a link — no database, no CMS, nothing in this repo needs to change.
- **A small catalog (roughly ≤5 products) he wants to browse, not just single buttons:** **Ecwid's free plan** (5 products) or **Gumroad** — free tier, embeds into a static site, still no backend for us to run.
- **He wants to edit products/photos himself without touching code, and the catalog might grow:** Add **Decap CMS** (free, open source) on top of the static site — gives Cruz a simple login where he edits products/content, and it commits those changes as files directly into this GitHub repo. The repo *is* the database in this setup — no server, no hosting cost, fully free. This is the option if he wants self-service control without a subscription.
- **Real inventory tracking (stock counts, SKUs) is the one thing that gets genuinely hard to keep free.** If his answer to question 11 above is "yes, I need live stock levels," flag it back to Ryan before building anything — that likely needs a small database (e.g. Cloudflare D1's free tier, or Airtable's free tier as a lightweight backend), which is still doable free but is a bigger technical lift than the options above.

Bottom line: push toward "contact for quote" or Stripe/PayPal links unless Cruz specifically needs more — that's what keeps this both free and low-maintenance for him long-term.

## Contributing

Cruz has push access to this repo — feel free to add files, images, notes, or open issues directly. No need to ask permission to drop things in; we'll sort/organize as it fills in.
