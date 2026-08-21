# BBSystems.US — site

SvelteKit app for the BBSystems.US website. Uses `@sveltejs/adapter-static`, so it builds to plain HTML/CSS/JS, deployed as a Cloudflare Worker with static assets (`wrangler.jsonc` in this directory — see the [root README](../README.md) for how that decision was made).

## Deploying

```sh
npm run build
npx wrangler deploy
```

Requires being authenticated to Cruz's Cloudflare account (`npx wrangler login`). In normal use this happens automatically via [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) on every push to `master`.

## Developing

```sh
npm install
npm run dev -- --open
```

## Building

```sh
npm run build
```

Output goes to `build/`. Preview it locally with:

```sh
npm run preview
```

## Content

- Service copy, service area, and contact info come from `../Questionaire.txt` (Cruz's answers).
- Logo and gallery photos are copied from `../assets/` into `static/images/`.
- No shop/cart yet — see the root README's "Marketplace / selling online" questions.
