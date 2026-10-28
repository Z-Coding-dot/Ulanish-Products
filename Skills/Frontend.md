ROLE
You are a senior art director + frontend architect. Build the FRONTEND ONLY (mock-first, backend-ready) of "Ulanish Store" (فروشگاه اولنیش): a premium product-catalog website that shows products from several companies. Visitors browse products and order by phone call or WhatsApp. There is NO cart, checkout, login or online payment. Store location: https://ishanch.com/c/ulanish (this is the live URL the site will relate to; do NOT scrape or copy that site's content, logo or code). It must look like an agency-designed premium store, not an AI-generated template.

WORKFLOW AND TOKEN ECONOMY (mandatory)
- Build everything in ONE continuous pass in this order, without stopping for approval: 1) scaffold, config, tokens, fonts, index.css, 2) i18n + services + mock data, 3) UI components + layout + motion primitives, 4) pages, 5) PWA, 6) checks, README.
- No screenshots, no browser, no Lighthouse, no visual tests. Verify only with: tsc --noEmit, ESLint, vite build, npm run i18n:check, Vitest. Run each once at the end of the build (and once after fixing failures).
- Use Edit for small changes, never re-print or re-read files you just wrote, no code in the final report. Final report: 8 lines max.
- Styling must actually work. Pin Tailwind v3.4 (tailwind.config.ts + postcss.config.js + @tailwind base/components/utilities in src/index.css, imported once in main.tsx, content globs for index.html and src/**/*.{ts,tsx}). After vite build report the output CSS size; under 20 KB means styling is broken, fix it before finishing.
- Design skill: install https://github.com/nextlevelbuilder/ui-ux-pro-max-skill following its README (its CLI is `uipro`), run its design-system search ONCE for "premium e-commerce product catalog, RTL, Arabic script" and use the result for style, typography and UX rules. Do not paste its output into chat. Where it conflicts with this prompt, this prompt wins. If the install fails, say so in one line and continue.

TECH STACK
React 18 + TypeScript (strict) + Vite, path alias "@/" → src/; Tailwind 3.4 with CSS-variable tokens; react-i18next + i18next-browser-languagedetector (languages "en", "fa-AF" Dari, "ps" Pashto; max 3); react-router-dom (lazy-loaded routes); Redux Toolkit (UI state only: toasts, search overlay, install prompt); React Context (i18n/direction, theme); Framer Motion; react-hook-form + zod; axios; lucide-react; clsx; react-helmet-async; vite-plugin-pwa; ESLint + Prettier; Vitest + React Testing Library. No other UI kit.

FOLDER STRUCTURE (follow exactly, TypeScript)
Ulanish/
├─ public/
├─ src/
│  ├─ api/            client.ts, endpoints.ts, types.ts (types + zod schemas)
│  ├─ assets/         logo, images, fonts, icons
│  ├─ components/
│  │  ├─ layout/      TopBar, Navbar, MobileHeader, BottomTabBar, Footer, Container, Section, PageLayout, PageHeader, Breadcrumbs, LanguageSwitcher, ScrollToTop, ScrollProgress, WhatsAppFab, SearchOverlay
│  │  └─ ui/          Button, Input, Textarea, Select(Listbox), Modal, Drawer, BottomSheet, Badge, Tabs, Accordion, Skeleton, Toast, Pagination, SectionHeading, ProductCard, ProductGrid, ProductGallery, SpecList, StockBadge, PriceTag, CompanyCard, CategoryCard, FilterPanel, SortSelect, StepsList, Hero/HeroSlider, CTASection, EmptyState, InstallButton, ContactCard, motion/ (Reveal, Stagger, ImageReveal, CountUp, PageTransition)
│  ├─ context/        ThemeContext, LanguageContext (sets dir and lang on <html>)
│  ├─ data/           siteConfig.ts, navigation.ts, sample content (companies, categories, products, hero slides, policies), all marked "sample"
│  ├─ hooks/          useScrollPosition, useMediaQuery, useDebounce, useInView, useDirection, useProductFilters (URL query sync), useInstallPrompt
│  ├─ i18n/           index.ts + locales/en.json, fa-AF.json, ps.json
│  ├─ pages/          one folder per page
│  ├─ redux/          store.ts, ui slice
│  ├─ services/       products, companies, categories, search, settings (each .mock.ts and .http.ts, factory in index.ts)
│  ├─ utils/          helpers, cn(), formatPrice, formatNumber, whatsapp.ts, normalizeArabicScript
│  ├─ App.tsx, main.tsx
│  └─ index.css       ← the ONE global stylesheet
├─ docs/API_CONTRACT.md
├─ .env.example       VITE_API_BASE_URL= , VITE_USE_MOCK=true
├─ eslint.config.js, index.html, package.json, .gitignore

STORE DATA (siteConfig.ts; never hardcode elsewhere)
- Store name: "Ulanish Store" / «فروشگاه اولنیش» (Dari) / «د اولنیش پلورنځی» (Pashto). Powered-by credit in footer: text link "ایشانچ / Ishanch" → https://ishanch.com (text only, no copied logo).
- Address: Kabul, Kārta-e-Chahār (کابل، کارته چهار), translated in all 3 languages.
- Phone: 0789266844 → tel:0789266844. WhatsApp: 0789266844 → https://wa.me/93789266844.
- Currency: Afghani (AFN). Prices are integers; display "5,000 افغانی" (fa-AF/ps) and "5,000 AFN" (en) using Intl with Latin digits by default (digit style configurable).
- Do NOT invent business hours, statistics, awards or customer counts. Sample content is clearly marked "sample" in data files.

PAGES AND ROUTES (each with a distinct composition and unique H1/title)
1. Home (/): centered premium hero slider → trust strip (Call, WhatsApp, Location as one bordered full-width bar) → companies/brands row (logo chips, auto-scroll marquee paused on hover) → featured products carousel (scroll-snap with arrows, drag) → categories as image tiles (mixed sizes) → new arrivals grid → "How to order" in 3 numbered steps (Choose a product → Call or WhatsApp us → Get your order) → short about split (photo + text + link) → CTA band (Call / WhatsApp) → footer.
2. Products (/products): compact PageHeader, search input, filters (company, category, price range, in-stock only), sort (newest, price low→high, price high→low), result count, product grid (4 columns desktop, 2 tablet, 2 compact mobile), pagination 12 per page, filters synced to URL query, filter drawer on mobile, skeletons, empty state "no products found". Also /products?company=… and /products?category=… as filtered views (no separate pages).
3. Product Details (/products/:id; keep the numeric id style like /products/115): back button ("بازگشت" / Back / "شاته", flips in RTL), image gallery (thumbnails, swipe, zoom lightbox), name, company, price (PriceTag), stock status (StockBadge: "موجود در انبار" in stock / out of stock), specs list (SpecList) including product code ("کد"), description, two primary actions: "Call now" (tel:) and "Order on WhatsApp" (wa.me link with a prefilled message in the CURRENT language: greeting + product name + product page URL + "— via Ishanch" line), share button, related products from the same company. Sticky bottom action bar on mobile (Call + WhatsApp) replacing the tab bar on this page. JSON-LD Product schema (no fake ratings).
4. About (/about): store story (sample text), what we offer, why choose us as a numbered list, companies we carry, location block with a link to Google Maps search for the address.
5. Contact (/contact): contact info cards (address, phone with tap-to-call, WhatsApp with tap-to-chat), a message form (name, phone, message, honeypot) that does NOT submit to a server: on submit it opens WhatsApp with the message prefilled; map placeholder block with an "Open in Maps" link.
Also: Terms (/terms), Policies (/policies), Reseller terms (/reseller-terms) as one reusable ContentPage (footer links, sample text), Search results (/search?q=), 404, translated Offline page.
Every nav item has its own route and distinct content. Add a Vitest test: all nav routes render with unique title and unique H1; active-link highlight is correct.

BRAND AND DESIGN SYSTEM (tokens in index.css; overridable from siteConfig)
- Logo color #2D2F7A (indigo). Until the real logo is provided, use a text wordmark "Ulanish" / «اولنیش» in #2D2F7A with a small geometric mark; build favicon and PWA icons from it.
- Primary #2D2F7A (hover #24265F, active #1C1E4B), used for headings accents, links, primary buttons (white text, weight 600), dark bands and footer. Deep #181A47 for scrims and dark bands. One warm accent #C8963E used ONLY for small highlights (price emphasis line, active indicators); never as large fills.
- Status: in-stock green #0E7C3A on tint #E3F4EA; out-of-stock red #B42318 on tint #FEE4E2. WhatsApp buttons use green #0E7C3A with white text (contrast ≥ 4.5:1) and the WhatsApp icon.
- Backgrounds #FFFFFF and one alternate tint #F5F6FB. Text: headings #0B1220, body #1F2937 (7:1), muted #4B5563 (4.5:1 minimum, never lighter). Borders 1px #E5E7EB. Shadows only on dropdowns, drawers, modals, the sticky navbar (very soft) and card hover.
- Shape: radius 12px product/image cards, 8px buttons/inputs/other cards, 16px modals, 999px only for avatars/chips/count badges. Container 1280px, 12-column grid, gutters 16/24/32px, section spacing 96-128px desktop / 64px mobile. Focus ring: 2px primary with 2px offset on every interactive element.
- BANNED: gradient blobs, blurred washes, gradient text, glow shadows, neon; font-weight 800/900; letter-spacing below -0.02em; emoji; "icon in colored square" on every card; three identical cards as the default layout everywhere; fake stats/ratings/reviews/urgency; AI-generated images; two-column hero; generic AI copy. The ONLY gradient allowed is the bottom scrim on hero slides and image cards.

TYPOGRAPHY (self-host via @fontsource, font-display: swap)
- Dari and Pashto: Vazirmatn 400/500/600/700 for headings and body (it contains ټ ډ ړ ږ ښ ڼ ې ۍ; add Noto Naskh Arabic only as a fallback). html[lang="fa-AF"] and html[lang="ps"]: line-height 1.85, letter-spacing 0, no uppercase/tracking, +1-2px size, headings weight 700.
- English: headings "Plus Jakarta Sans" 600-700, body "Figtree" 400/500/600.
- Scale: H1 clamp(2.25rem, 5vw, 3.75rem), H2 clamp(1.75rem, 3.5vw, 2.5rem), body 17px (18px Arabic script), max 65ch. Tabular numerals for prices and codes.

NAVBAR (premium)
- Desktop: thin TopBar (deep #181A47, white 14px): phone and WhatsApp on the start side, language dropdown on the end side. Main bar: solid white, 80px, shrinks to 64px on scroll with a soft shadow. Logo at start, links centered (Home, Products, About, Contact; hover underline slides in, active link has a 2px accent underline), end side: search icon button (expands into an input with debounced 300ms suggestions: thumbnail, name, price, highlighted match, keyboard navigation, recent searches clearable), "Call now" outline button, primary "Order on WhatsApp" button. Sticky; scroll-margin-top set so it never covers anchors.
- Mobile (below 768px): slim 56px header (logo, search icon, language icon button) + fixed bottom tab bar (Home, Products, About, Contact; icon 24px + 12px label; active item has filled icon, primary color and a 3px top indicator), safe-area inset padding, hidden on product details (replaced by the sticky action bar), mirrored in RTL, content padded so nothing is covered.

LANGUAGE DROPDOWN (custom, not native select)
Trigger: globe icon + current language in its own script + chevron. Panel: min-width 220px, radius 12px, 1px border, soft shadow, 150ms fade/scale, anchored and mirrored in RTL. Options: native names (English, دری, پښتو) with a small code (EN / FA / PS), check on active, hover/focus states, full keyboard support (arrows, Home/End, Enter, Esc), aria-listbox, outside click closes. On mobile it opens as a bottom sheet with 56px rows. Persist in localStorage; set dir and lang on <html>. The same Listbox component powers all selects (sort, company, category).

HERO = PREMIUM CENTERED AUTO SLIDER
Full-width, height min(88dvh, 760px), min 520px on mobile, 3-5 slides from data (image, headline, subtitle, primary CTA, secondary CTA, order, translatable). Full-bleed photo with uniform overlay rgba(24,26,71,0.55) plus a bottom scrim for depth, white text passing AA. Content CENTERED horizontally and vertically: headline (max 10 words), one subtitle line, two buttons side by side (primary + outline-white; stacked full-width on mobile). Single column; no cards, badges or side image. Motion: crossfade 900ms with 1.08→1 slow zoom, headline/subtitle/buttons reveal in sequence (translateY 24px→0, 60ms stagger). Controls: 48px circular arrows at the vertical middle edges (mirrored in RTL), centered dots with a progress fill (6s), keyboard arrows, touch swipe, pause on hover/focus/tab hidden, autoplay off under prefers-reduced-motion, first image preloaded with fetchpriority high, others lazy.
Inner pages use one PageHeader: compact centered banner (200-280px), photo or solid #2D2F7A band with overlay, centered H1, breadcrumbs (chevrons flip in RTL).

PRODUCT CARD (the special component)
- Image area 4:5 with a soft #F5F6FB background and object-fit cover; second image crossfades in on hover (if present). On desktop hover the card lifts 4px, image scales 1.04 and tilts slightly toward the pointer (max 4°, framer-motion, transform only; disabled on touch and reduced motion), and a thin accent line draws along the card bottom.
- Inside the image (not floating over it): company badge top-start (small white chip with company name), StockBadge top-end (green dot + "In stock" / red "Out of stock"). Bottom of the image has a short deep-indigo scrim holding the price in large tabular numerals with the accent underline.
- Below the image: product name (2 lines max), product code in muted small text, and an action row: WhatsApp icon button (green) + Call icon button + "Details" link. On desktop the action row slides up on hover/focus; on mobile it is always visible as compact 44px icon buttons. The whole card (image + name) is one link to the details page with a single accessible name; action buttons are separate focusable elements.
- Skeleton with the same ratio; missing image uses a neutral tone with a subtle pattern, never a fake illustration. Out-of-stock cards are slightly desaturated and the WhatsApp action reads "Ask about availability".
- One consistent ProductCard across Home, Products, Search and Related.

MOTION (Framer Motion on every page and element)
Shared primitives Reveal (fadeUp/fadeIn/slideStart/slideEnd/scale), Stagger (≤ 80ms), ImageReveal (1.05→1), CountUp, PageTransition. Apply them to headings, paragraphs, images, cards, lists, buttons, forms and footer on every page. Defaults 400-600ms, cubic-bezier(0.22,1,0.36,1), once per element, translate ≤ 24px, slide directions mirror automatically in RTL, route transition 200ms fade, hover/tap micro-interactions on cards, buttons, links, icon buttons. Animate only transform and opacity; limit simultaneous animations on mobile; prefers-reduced-motion replaces everything with a simple fade. Nothing bounces, floats, pulses or glows.

GLOBAL ELEMENTS
- WhatsAppFab on ALL pages: 56px green circle with the WhatsApp icon in the bottom corner (end side, mirrored in RTL), above the mobile tab bar and safe-area inset, opens wa.me/93789266844 with a generic greeting in the current language; on product details it uses the product message; entrance fade after 1s; hides when the footer WhatsApp button is in view is NOT required. A small tooltip label appears on hover (desktop only).
- ScrollToTop on route change (restore position on browser back) + floating back-to-top button (after 400px, 150ms fade, stacked above the WhatsApp button, mirrored in RTL, translated aria-label) + 2px scroll progress bar in the primary color.
- Footer (deep #181A47): 4 columns (logo + short text, quick links, store info: address, phone, WhatsApp, legal links: Terms, Policies, Reseller terms), "Powered by Ishanch" text credit, copyright, and an "Install app" button (InstallButton) that is visible whenever the app is installable and hidden when already installed; on iOS it shows a translated "Add to Home Screen" instruction sheet. Social icon buttons 44px only if links exist in siteConfig.
- Inputs 48px, 1px border, 8px radius, label above, translated validation errors with icon; Modal becomes bottom sheet on mobile; toasts bottom-center on mobile, top-end on desktop; skeletons for every loading state; empty states for no results.

PWA
vite-plugin-pwa: manifest (name "Ulanish Store", short_name "Ulanish", theme_color #2D2F7A, background #FFFFFF, display standalone, start_url "/", scope "/", icons 192/512 + maskable, shortcuts: Products, Contact), auto-update service worker with an "Update available" toast, translated offline page. Runtime caching: static assets cache-first; images stale-while-revalidate; public product/company GET data network-first with a 4s timeout. Document HTTPS-only in the README.

TRANSLATIONS (en, fa-AF, ps)
- Zero hardcoded visible strings anywhere (labels, placeholders, buttons, aria-labels, alt text, toasts, validation messages, empty states, 404, SEO title/description, WhatsApp message templates, stock labels, number/price formats). Product, company and category content are locale objects {en, fa-AF, ps}.
- `npm run i18n:check` (script) fails on any missing key in any locale; enable eslint-plugin-i18next; log missing keys in dev. Natural Dari and natural Pashto (not transliteration, not literal machine translation); mark locale files "needs native review before launch". No English text in fa-AF/ps views except brand and company names.
- Search normalizes Arabic script (diacritics, ي/ی, ك/ک, ه/ە) and matches names, company, category and product code. Search goes through the services layer.

RESPONSIVE (100%, mobile first)
Design for 320, 360, 390, 430, 768, 1024, 1280, 1440. No horizontal scroll, no fixed widths, no clipped text, tap targets ≥ 44px, fluid type with clamp(), responsive images (srcset/sizes, width/height set, lazy below the fold), grids collapse 4→3→2, filters become a drawer, modals become bottom sheets, forms single column, safe-area insets, 100dvh instead of 100vh. Write the CSS carefully since I will check visually myself.

API AND SERVICES
Layered UI → hooks → services → api. Each service exposes ONE interface with *.mock.ts (src/data, simulated latency) and *.http.ts (axios client, VITE_API_BASE_URL, error normalization, GET-only retry, in-memory TTL cache, zod validation); the factory in services/index.ts picks by VITE_USE_MOCK. Product shape: id, code, name (L), companyId, categoryId, price (integer AFN), stock ('in' | 'out' with optional quantity), images[], specs [{label (L), value (L)}], description (L), createdAt. docs/API_CONTRACT.md lists every endpoint (products with filters/sort/pagination, product by id, companies, categories, search, settings) with request/response shapes. If the real product source is the Ishanch platform, only the *.http.ts mapping must change.
Ship sample data: 24 products across 6 companies and 5 categories (clearly marked "sample"; include the sample «دیتابیس سونا» database product at 5,000 AFN, in stock, code 2), 4 hero slides.

IMAGERY
Real photography only. If you cannot download licensed Unsplash/Pexels photos (the network may block it), generate neutral indigo-tone pattern placeholders at exact ratios (hero 16:9, product 4:5, category 1:1 and 3:4, banner 21:9) and list in your final report exactly which files I must replace with real product photos. Never draw fake illustrations. Record licenses of any downloaded photo in docs/IMAGE_CREDITS.md.

SEO AND ACCESSIBILITY
react-helmet-async per page (title, description, Open Graph, canonical), semantic HTML, JSON-LD Organization on Home and Product on details, labels on all inputs, keyboard navigation, visible focus, aria on dialogs/listboxes/tabs, contrast ≥ 4.5:1.

DELIVERABLES
1. Working scaffold with every folder/file above and install/run instructions.
2. Complete code for every component, page, slice, service, hook, locale file. No placeholders, TODOs or "..." omissions.
3. docs/API_CONTRACT.md.
4. README: "How to rebrand for another store" (siteConfig, logo, color, languages, products), "How to go live" (VITE_USE_MOCK=false + VITE_API_BASE_URL, adapting *.http.ts), and "Manual checks before launch" (Pashto glyphs, RTL, mobile, native Dari/Pashto review, real product photos).
5. Passing: tsc --noEmit, ESLint, vite build (CSS over 20 KB), i18n:check, Vitest (nav integrity, search, WhatsApp link builder, price formatting).
6. Final report: 8 lines max, plus the list of 5 pages I should open to check by eye (Home in fa-AF, Products on mobile, Product details in ps, Contact in en, language dropdown on mobile).