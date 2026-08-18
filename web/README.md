# BBSystems.US — site

SvelteKit app for the BBSystems.US website. Uses `@sveltejs/adapter-static`, so it builds to plain HTML/CSS/JS and can deploy to either GitHub Pages or Cloudflare Pages (see the [root README](../README.md) for the hosting/domain decision).

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
