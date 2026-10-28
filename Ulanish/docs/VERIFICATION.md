# Verification results

Completed 28 October 2026. Checks ran against the final application source.

| Required check | Result |
| --- | --- |
| `npm run typecheck` / `tsc --noEmit` | PASS |
| `npm run lint` / ESLint with i18next rule enabled | PASS, no warnings |
| `npm run build` / Vite + PWA | PASS |
| `npm run i18n:check` | PASS: 161 keys in each of 3 locales |
| `npm test` / Vitest | PASS: 12 tests, 2 files |

Production CSS: **62.56 kB**, gzip 15.91 kB. The 20 kB threshold applies to the uncompressed CSS artifact. The PWA generated `dist/sw.js` and Workbox with 70 precache entries (1110.27 KiB).

Tests cover every main/legal nav route with a unique document title and H1, desktop/mobile active-link state, product/search/offline/404 route rendering, Pashto language/direction, sample assortment, normalized search through services, filtering/sorting/pagination, integer AFN display and multilingual WhatsApp URL encoding.

As requested, no browser, screenshots, Lighthouse or visual tests were used. Browser-specific PWA install/update behavior, device layouts, screen-reader interactions and photo quality require the manual review described in README. Mock inventory, native-language review and five original neutral image patterns remain launch-content tasks, not production inventory.

On this Windows sandbox Vite/Vitest required elevated filesystem access for esbuild to resolve the project config. The final checks passed with that access. TypeScript and ESLint ran inside the normal workspace sandbox.
