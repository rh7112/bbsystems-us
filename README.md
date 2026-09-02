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

**The site is live at https://bbsystems.us** 🎉 It's a SvelteKit app in [`web/`](./web), deployed as a Cloudflare Worker with static assets (`web/wrangler.jsonc`) — not Cloudflare Pages; started on Pages, switched to a Worker since Workers can attach a custom domain directly from config (`routes` with `custom_domain: true`) with no dashboard-only step required, unlike Pages. Hosted under Cruz's own Cloudflare account. Built from Cruz's answers in `Questionaire.txt` and the photos/logo he uploaded to `assets/`: services copy, service area, and a build gallery are in. There's no shop/cart yet -- see #15. See [`web/README.md`](./web/README.md) for how to run it locally.

Auto-deploy on push is wired up via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) (GitHub Actions + `wrangler-action`, running `wrangler deploy`) — chosen over Cloudflare's native "Connect to Git" specifically because the Cloudflare account (Cruz's) and the GitHub repo (Ryan's) are owned by different people; a plain API-token secret sidesteps the cross-account GitHub-App-authorization issue that approach would've hit.

## What we need from Cruz

Every content/technical question from the original questionnaire is answered and built (see `Questionaire.txt`) -- what's left is tracked as issues instead of listed here, so this file doesn't drift out of sync with what's actually still open:
- [#15](https://github.com/rh7112/bbsystems-us/issues/15) -- selling online / marketplace scope, the one big open question left
- [#16](https://github.com/rh7112/bbsystems-us/issues/16) -- optional: what "BB" stands for
- [#7](https://github.com/rh7112/bbsystems-us/issues/7) -- the contact page/form
- [#8](https://github.com/rh7112/bbsystems-us/issues/8) -- email routing (see below, left in this README since it's actively in progress)

## Domain setup (Ryan handling this part)

**Resolved (2026-08-21):** the domain's nameservers were already pointed at Cloudflare, and it turned out to be **Cruz's own Cloudflare account** — the same one bbsystems.us was transferred into when Squarespace (formerly Google Domains) handed it off. Cruz added Ryan as a member of that account; Ryan's role initially only had DNS-level access, which blocked creating a Pages project, so Cruz added the **`Workers Platform Admin`** role to fix that. With that, the site is now deployed:

- ✅ Deployed as a Worker (`bbsystems-us`, config in `web/wrangler.jsonc`) in Cruz's Cloudflare account — static assets, no server-side code
- ✅ **`bbsystems.us` and `www.bbsystems.us` are both live**, attached directly from `wrangler.jsonc`'s `routes` config (`custom_domain: true`) on deploy — no dashboard step needed, unlike Pages custom domains
- ✅ `.github/workflows/deploy.yml` added for auto-deploy on every push to `master`, via GitHub Actions + `wrangler-action` (not Cloudflare's native "Connect to Git" — that needs a GitHub identity with admin rights on the repo, which gets awkward since the Cloudflare account and the GitHub repo belong to different people; a plain API-token secret avoids that entirely)
- ✅ `CLOUDFLARE_API_TOKEN` recreated scoped to **Workers Scripts: Edit** and working — deploys have been succeeding consistently since.

**Note on how we got here:** an earlier attempt used Cloudflare Pages instead of a Worker. Along the way, someone also connected this repo to a separate Cloudflare *Worker* via the dashboard's "Connect to Git" (Workers Builds) — that one kept auto-recreating itself with a broken default build command every push, since `wrangler delete` only removes the deployed script, not the underlying Git-integration trigger. It's been fully replaced by the Worker+`wrangler.jsonc` setup above, which is now the only deploy path — nothing dashboard-Git-connected should exist anymore.

### Restoring support@ and admin@ email -- decided: Zoho Mail (free or paid, TBD)

**Decided (2026-09-02):** real, separate mailboxes at `support@bbsystems.us` and `admin@bbsystems.us` via **Zoho Mail** -- not Cloudflare Email Routing. Routing only *forwards* mail into an existing inbox (e.g. `bbsystemsus@gmail.com`); it can't host a real mailbox on its own, and the ask here is for `support@`/`admin@` to be actual inboxes Cruz logs into, not just a forward. Cruz may go with a paid Zoho Mail plan instead of the free one -- see the comparison below. Which one doesn't change any of the setup steps, just which button gets clicked during signup.

Split by purpose, per Cruz:
- **`support@bbsystems.us`** -- customer-facing, "basically 95% of things." The contact form should send here once it's live (currently sends to `bbsystemsus@gmail.com` -- see `web/worker/index.ts`'s `CONTACT_TO`, needs updating as a follow-up once the mailbox is verified and receiving mail).
- **`admin@bbsystems.us`** -- internal/business stuff that isn't customer-facing (domain renewals, vendor correspondence, etc.). Not referenced anywhere on the public site.

**Free vs. paid (2026-09-02 pricing, worth reconfirming on Zoho's site before signing up):**

| | Free (Forever Free) | Mail Lite (paid) |
|---|---|---|
| Cost | $0 | ~$1/user/month |
| Addresses / storage | Up to 5 addresses, 5GB each, 1 domain | Same address/domain limits, 5-10GB each depending on tier |
| **IMAP/POP/ActiveSync** | ❌ -- webmail (mail.zoho.com) or Zoho's mobile app only | ✅ -- can use Outlook, Apple Mail, Thunderbird, or fold into an existing phone Mail app |
| Forwarding | ❌ | ✅ |

The free plan's real cost isn't money, it's workflow: Cruz checks `support@`/`admin@` in Zoho's own app/webmail, separate from however he checks `bbsystemsus@gmail.com` today. Mail Lite removes that friction for ~$1/mailbox/month. Worth deciding based on whether that separate-app friction actually bothers him day to day, not just "free vs. not free."

**Does a paid plan help with the email-to-ticket idea (see "Web Hosting service" below)? Short answer: not directly.** Ticketing is a *separate* Zoho product, **Zoho Desk** (which has its own free tier already), not a feature of Zoho Mail at any tier -- paid Zoho Mail buys IMAP/forwarding, not tickets. Zoho does offer a Mail<->Desk integration that auto-converts incoming support email into Desk tickets, but that's Zoho Desk's feature working *with* Zoho Mail, not something a Zoho Mail upgrade unlocks by itself. I couldn't confirm from Zoho's docs whether that integration itself requires paid tiers on either product -- worth a direct check on Zoho's site (or asking their support) once Cruz is actually ready to wire that up, rather than assuming either way.

**Setup steps (Cruz's Zoho account + Cruz's Cloudflare account -- I can't do either, no account access to either):**
1. Sign up at [zoho.com/mail](https://www.zoho.com/mail/) -- pick **Forever Free** or **Mail Lite** (Mail Lite asks for payment info; Forever Free doesn't). Add `bbsystems.us` as the domain. Free can be upgraded to Mail Lite later without redoing the steps below, if he wants to try free first.
2. Zoho gives a DNS **TXT record** to prove domain ownership -- add it in Cloudflare (`bbsystems.us` zone -> DNS -> Records).
3. Zoho gives **MX records** to point mail at their servers -- add those too (this is the step that actually makes `@bbsystems.us` mail arrive at Zoho instead of nowhere).
4. Also add the **SPF and DKIM** records Zoho provides -- skipping these makes outbound mail from these addresses likely to land in spam.
5. Once DNS verifies (can take a few hours), create the two mailboxes: `support@bbsystems.us` and `admin@bbsystems.us`.
6. Tell Ryan once `support@` is live and receiving mail -- the contact form's `CONTACT_TO` gets updated to send there instead of the personal Gmail address.

## Web Hosting service (new, 2026-08-21)

A new service line, live on the site as the "Web Hosting" section (`#hosting`): BBSystems.US now offers to design/build and host websites for customers, not just PC/IT services.

**Business model — internal notes, not published on the site:**
- Cruz gets a **finder's fee** for referring hosting/website clients — amount not yet decided between Ryan and Cruz, so nothing about this appears on the public site. Sort out the actual number separately.
- Public pricing (updated 2026-08-21): website builds start at **$500&ndash;$1,000+**, depending on how static vs. dynamic the site is. Management/maintenance is **$20+/mo**, depending on the breadth of the project. Both are stated as starting points on the site, not flat rates — still push people to contact for an exact quote.
- Ryan's guidance on where actual quotes land within/beyond that range: a simple single-page site should fall at the lower end (~$500); a B2B site can run into the several-thousand-dollar range depending on how complex/hard it is to build. The public copy hints at this range without publishing exact tiers.

**Still needed — a support inbox for hosting clients:**
Plan is a free-tier helpdesk (Freshdesk or Zoho Desk free plan) so hosting client requests come in as tickets instead of loose emails. I can't sign up for a third-party SaaS account on anyone's behalf — either Cruz or Ryan needs to create the free account directly. Once it exists, send me the helpdesk's inbound support-ticket email address (e.g. `something@yourcompany.freshdesk.com`) and I'll wire up Cloudflare Email Routing so a dedicated address (e.g. `hosting@bbsystems.us`) forwards straight into it — same mechanism as the `support@`/`admin@` email restoration above, just a different destination.

## Contributing

Cruz has push access to this repo — feel free to add files, images, notes, or open issues directly. No need to ask permission to drop things in; we'll sort/organize as it fills in.
