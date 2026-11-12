# Builder's Day

Landing page for **Builder's Day**, Day 2 of Product (Un)Conference '26 by [The Product Folks](https://www.theproductfolks.com): lightning talks, a four hour buildathon on real problems from founders, operators and VCs, and a panel. Sun 22 Nov, Bengaluru.

Live at [theproductfolks.com/product-unconference-2026-buildersday](https://www.theproductfolks.com/product-unconference-2026-buildersday).

## Run it

```sh
pnpm install
pnpm dev      # http://localhost:3000 (redirects to /landing)
pnpm build && pnpm start
```

## Where things live

- **Copy:** `src/app/landing/content.ts`. Every word on the page is in there, so copy edits don't touch layout code.
- **Page and sections:** `src/app/landing/page.tsx` and `src/app/landing/_components/`.
- **Logos, photos, partner marks:** `public/brand/`, typed in `src/lib/brand.ts`.
- **Design tokens:** `src/app/globals.css` (Tailwind 4).

## Embedding

The page is embedded full-screen in an iframe on the Webflow site. That's why `next.config.ts` sets a `frame-ancestors` CSP for `/landing` that allows theproductfolks.com and `*.webflow.io`, while every other route stays unframeable. The Builder's Pass button opens Luma's checkout overlay, so the CSP also allows `embed.lu.ma` and frames from `luma.com` / `lu.ma`, and `Permissions-Policy` allows `payment` for Luma.

## Sneak-peek request cards

The "The requests are in" cards are a **copy** of the data and card component from the separate requests-for-builders repo (`src/app/requests/content.ts` and `src/app/requests/_components/request-card.tsx`). Only these modules are copied here, not the board itself. When requests change there, copy them over so the two stay in sync. The ids shown are listed in `content.rfs.featured`.

## Next.js 16

This project uses Next.js 16 (Cache Components, Turbopack, `partialPrefetching`). APIs and conventions differ from older versions. Read the guides in `node_modules/next/dist/docs/` before changing framework-level code. See `AGENTS.md`.
