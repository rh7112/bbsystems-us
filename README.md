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

The site is **live** on Cloudflare Pages, hosted under Cruz's own Cloudflare account: https://bbsystems-us-5o2.pages.dev (temporary `.pages.dev` URL — `bbsystems.us` itself isn't pointed at it yet, see "Domain setup" below). It's a SvelteKit app in [`web/`](./web), built from Cruz's answers in `Questionaire.txt` and the photos/logo he uploaded to `assets/`: services copy, service area, and a build gallery are in. There's no shop/cart since he hasn't answered the marketplace questions yet (Q9-14) and his pricing answer ("determined live with customer") points away from needing one anyway. See [`web/README.md`](./web/README.md) for how to run it locally.

Auto-deploy on push is wired up via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) (GitHub Actions + `wrangler-action`) — chosen over Cloudflare's native "Connect to Git" specifically because the Cloudflare account (Cruz's) and the GitHub repo (Ryan's) are owned by different people; a plain API-token secret sidesteps the cross-account GitHub-App-authorization issue that approach would've hit. **Still needs:** the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets added to this repo before it'll actually run — see "Domain setup" below.

Still waiting on Cruz for the marketplace (Q9-14) and remaining technical (Q17-18) questions below.

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
16. ~~**Hosting**~~ — decided: **Cloudflare Pages**, under Cruz's own Cloudflare account (the one bbsystems.us's domain now lives in). Live at a temporary `.pages.dev` URL — see Status above.
17. **Domain** — resolved: the nameservers were already Cruz's own Cloudflare account (confirmed 2026-08-21, after Cruz upgraded Ryan's permissions there). Still open: attaching `bbsystems.us` as the Pages project's custom domain, and finishing the GitHub Actions secrets — both dashboard/one-time steps, see "Domain setup" below.
18. **Contact form** — does he want visitors to be able to submit a form, or is a phone/email link enough?

### One more, totally optional — the name
You told us you'd rather keep the site business-only, no personal bio, no life story — and that's exactly how it's being built. This is a separate, smaller thing: right now nothing on the site explains what "BB" stands for, and it's purely a branding question, not a personal one. Totally your call, no wrong answer:
- **Leave it unexplained** — plenty of businesses do, the logo carries the brand fine on its own.
- **One line, no story:** something like "BB = Bully-Built" near the logo or in the footer.
- **A little more:** a short caption on the logo/dog photo itself (not a bio, just naming what's in the image), if that ever feels right.

Whatever you're comfortable with — including nothing — works for us.

## Domain setup (Ryan handling this part)

**Resolved (2026-08-21):** the domain's nameservers were already pointed at Cloudflare, and it turned out to be **Cruz's own Cloudflare account** — the same one bbsystems.us was transferred into when Squarespace (formerly Google Domains) handed it off. Cruz added Ryan as a member of that account; Ryan's role initially only had DNS-level access, which blocked creating a Pages project, so Cruz added the **`Workers Platform Admin`** role to fix that. With that, the site is now deployed:

- ✅ Pages project `bbsystems-us` created in Cruz's Cloudflare account
- ✅ Site built and deployed — live at https://bbsystems-us-5o2.pages.dev
- ✅ `.github/workflows/deploy.yml` added for auto-deploy on every push to `master`, via GitHub Actions + `wrangler-action` (not Cloudflare's native "Connect to Git" — that needs a GitHub identity with admin rights on the repo, which gets awkward since the Cloudflare account and the GitHub repo belong to different people; a plain API-token secret avoids that entirely)
- ⬜ **Still needed:** a scoped Cloudflare API token, added as this repo's `CLOUDFLARE_API_TOKEN` GitHub secret (plus `CLOUDFLARE_ACCOUNT_ID`, not secret but stored the same way per Cloudflare's own convention: `d44f11a5b3c8df4eaac797b14f4dfd48`) — until that's set, pushes to `master` won't actually deploy. Either Cruz or Ryan can create the token now that Ryan has `Workers Platform Admin`: Cloudflare dashboard → **My Profile → API Tokens → Create Token**, scoped to Account → Cloudflare Pages → Edit, for Cruz's account. Then run `gh secret set CLOUDFLARE_API_TOKEN --repo rh7112/bbsystems-us` (prompts for the value — never paste API tokens into chat/README/commits).
- ⬜ **Still needed:** attach `bbsystems.us` as the Pages project's custom domain — this is dashboard-only, no CLI/API path exists for it. Cloudflare dashboard → **Workers & Pages → bbsystems-us → Custom domains → Set up a domain** → enter `bbsystems.us`. Since the zone and the Pages project are now in the same account, Cloudflare wires up the DNS automatically.

### Restoring support@ and admin@ email (free)

Now that Cruz's Cloudflare account is confirmed reachable, this is fully actionable: **Cloudflare Email Routing** forwards `support@bbsystems.us` and `admin@bbsystems.us` to an existing inbox (e.g. `bbsystemsus@gmail.com`) for free — no paid mailbox, no Workspace subscription. Dashboard → the `bbsystems.us` zone → **Email → Email Routing** → enable, add both addresses as forwards. Worth doing whenever — doesn't depend on the custom-domain step above.

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
