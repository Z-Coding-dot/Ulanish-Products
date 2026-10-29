# Ulanish Store

A local frontend implementation of `../Skills/Frontend.md`: React 18, strict TypeScript, Vite, Tailwind 3.4.17, RTL English/Dari/Pashto catalog and direct phone/WhatsApp ordering. No cart, checkout, account, payment or contact server.

## Install and run

Requires Node 22+ and npm. From this directory run `npm install`, then `npm run dev`. On Windows PowerShell with script execution restrictions use `npm.cmd install` and `npm.cmd run dev`. Vite prints the local URL (normally `http://localhost:5173`). Build with `npm run build`; serve the built bundle with `npm run preview`. `dist/` is the deployment artifact.

Copy `.env.example` to `.env.local` if settings need changing. The default is mock mode. All 24 products, six company identities, five categories, prices, hero copy, descriptions and legal policies are explicitly sample content. Product `/products/115` is the required sample Sona Database (code 2, 5,000 AFN, in stock). Store name/address/phone are the supplied identity. The Ishanch site was not scraped.

## How to rebrand for another store

- Change store identity, contact links, canonical platform URL, map URL, credit, social links, digit style and color overrides in `src/data/siteConfig.ts`. These override the single stylesheet's semantic tokens.
- Replace the original temporary text wordmark in `Wordmark.tsx`, favicon and PNG icons. Keep maskable art within the safe central area.
- Replace `src/data/sample.ts` with verified store products, companies/categories and four hero slides. Preserve each localized `{en,"fa-AF",ps}` object and schema shape.
- Edit `src/i18n/locales/*.json` together and run `npm run i18n:check`. All locale resources are marked “needs native review before launch”. Native company names are used in RTL views.
- Self-hosted Figtree, Plus Jakarta Sans, Vazirmatn and Noto Naskh Arabic are bundled from `@fontsource` with `font-display: swap`. The only global stylesheet is `src/index.css`, imported once in `main.tsx`.
- The sliders, headers, category tiles, and story sections use licensed sample photography; sources are documented in `docs/IMAGE_CREDITS.md`. Cards, galleries, and search thumbnails share product-specific example icons until real photos are supplied. Update each product's image paths with individually matched catalog photography before launch.

## How to go live

Set `VITE_USE_MOCK=false` and `VITE_API_BASE_URL` to a public API implementing `docs/API_CONTRACT.md`. These settings are baked into the build. Adapt each `src/services/*.http.ts` if the real source uses a different response shape; keep the service interfaces and UI unchanged. Confirm CORS and validate real data before deploying. `/settings` supplies the translated catalog announcement and an enable/disable flag.

Build and deploy `dist/` to HTTPS hosting. PWA installation/service workers require HTTPS (localhost is the development exception). Configure SPA fallback: all non-file, non-API routes must serve `index.html`, including product details, `/offline` and legal pages. The current build assumes hosting at the origin root; if mounting under a subpath, set Vite `base`, Router `basename` and PWA `scope`/`start_url` consistently and update absolute asset URLs. Change `siteConfig.platformUrl` to the final canonical URL.

The PWA precaches the shell, all lazy route chunks, fonts and patterns. Images use stale-while-revalidate; public API GETs use network-first with a four-second cache fallback; static assets use cache-first. Automatic updates register on load, and an update toast appears when a waiting update requires refresh. Installation uses the browser prompt; iOS presents translated Safari instructions. An offline page is available at `/offline`; cached routes remain usable offline. Uncached API data still requires connectivity and shows a translated retry state.

This task deliberately uses code checks only: no browser, screenshots, Lighthouse or visual tests. The user should perform the visual checks below before launch.

## Manual checks before launch

- Have native Dari and Pashto speakers review every locale, sample editorial text and WhatsApp template. Inspect Pashto ټ ډ ړ ږ ښ ڼ ې ۍ glyphs, punctuation and mixed-direction phone/code/price values.
- Check RTL and LTR at widths 320, 360, 390, 430, 768, 1024, 1280 and 1440. Verify the sticky header, bottom tabs/order bar and FAB clear safe areas and do not cover focused controls.
- Operate the language dropdown/listboxes by arrows, Home/End, Enter and Escape. Test outside dismissal, modal focus trapping, search suggestions, back-button filter/scroll restoration and reduced motion.
- Replace all catalog/editorial/legal samples, temporary marks and neutral images. Verify photo licenses, real stock/prices and approved policies. No business hours, ratings, customer counts or awards were invented.
- Verify phone and WhatsApp links on real devices, the contact form's WhatsApp handoff, Maps, native share/clipboard fallback and out-of-stock wording.
- Verify installability, iOS home-screen instructions, offline navigation and an update on a second HTTPS deployment.

Open these five views: Home `/?lng=fa-AF`; Products `/products` on mobile; Product details `/products/115?lng=ps`; Contact `/contact?lng=en`; mobile language dropdown on any page.

## Checks

`npm run typecheck` (`tsc --noEmit`), `npm run lint`, `npm run build`, `npm run i18n:check`, `npm test`. Vitest covers nav route/H1/title uniqueness, active links, other page routes, document direction, sample data, normalized service search, filters/pagination, price formatting and WhatsApp encoding. Build CSS must exceed 20 KB, as required by the brief. The final task report records actual check results and CSS size.

## Structure and design

`api/` owns runtime schemas, Axios and endpoint constants; `services/` switches mock and HTTP implementations; `hooks/` manages requests and URL filters; `context/` owns direction/theme/catalog metadata; Redux stores only toasts, search visibility and the install instruction sheet. React Router lazy-loads every route. Shared motion primitives respect reduced motion. Every page uses the same product card.

The requested UI/UX Pro Max skill was installed using the repository's current `uipro` CLI and one design-system search. The brief's brand, typography and surface restrictions override conflicting search recommendations. Skill files are local in `.agents/skills/ui-ux-pro-max/` and available to subsequent coding sessions.
