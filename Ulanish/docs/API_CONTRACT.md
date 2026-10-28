# Ulanish public catalog API

UI → hooks → services → API. All endpoints are GET only. No order, payment, login, contact submission or mutation endpoint exists.

Set `VITE_USE_MOCK=false` and `VITE_API_BASE_URL=https://your-api.example/api`. Relative endpoint paths below append to that base URL. Enable CORS for the frontend origin. Return JSON with status 200; an unknown product returns 404. Do not return HTML errors with status 200. The client validates all responses with `src/api/types.ts`, caches validated results for 60 seconds, uses a 10-second timeout and retries GET once for network/5xx errors. Errors normalize to `ApiError(status, code)` (`network`, `notFound`, `invalidResponse`).

## Shared shapes

`L = { en: string, "fa-AF": string, ps: string }`. All three translations are required, including company/category names, specs and descriptions.

`Product = { id: integer, code: string, name: L, companyId: string, categoryId: string, price: nonnegative integer AFN, stock: "in" | "out", quantity?: integer, images: string[], specs: { label: L, value: L }[], description: L, createdAt: ISO-8601 string }`.

`Company = { id: string, name: L, description: L, monogram: string }`.

`Category = { id: string, name: L, image: string }`.

`ProductPage = { items: Product[], total: integer, page: integer, pageSize: integer }`. `total` is the count before pagination. Prices have no decimal fractions. Product URLs retain numeric IDs, for example `/products/115`.

## Endpoints

| Endpoint        | Request                                                                                                                                                           | Response                                       |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `/products`     | Optional query: `q`, `company`, `category`, `min`, `max`, `inStock=true`, `sort=newest\|price-asc\|price-desc`, `page` (1-based), `pageSize` (default 12, max 48) | `ProductPage`                                  |
| `/products/:id` | Numeric product ID                                                                                                                                                | `Product`, or 404                              |
| `/companies`    | None                                                                                                                                                              | `Company[]`                                    |
| `/categories`   | None                                                                                                                                                              | `Category[]`                                   |
| `/search`       | `q`, plus the product filters, sorting and pagination above                                                                                                       | `ProductPage`                                  |
| `/settings`     | None                                                                                                                                                              | `{ announcement: L, catalogEnabled: boolean }` |

`company` and `category` are IDs. Filters combine with AND; price bounds are inclusive. Search matches any translated name, company, category or code. Normalize Arabic diacritics, tatweel, ي/ی, ك/ک, ه/ە, Arabic/Persian digits and zero-width spacing. Sorting is by `createdAt` descending, or numeric `price`. Clamp out-of-range pages to the last available page; an empty result uses page 1. Do not omit zero values when serializing price filters.

## Frontend URLs

The frontend uses `stock=in` in its shareable filter URL; `useProductFilters` maps that to the service's `inStock` boolean. UI URL `company`/`category`/`q`/`min`/`max`/`sort`/`page` match the API concepts. Language can be selected with `?lng=en`, `?lng=fa-AF`, `?lng=ps` and is then persisted.

## Adapting an Ishanch source

No Ishanch content was scraped. Keep UI, hooks, schemas and service interfaces unchanged. Map the platform's response fields and pagination to these shapes inside each `*.http.ts` adapter. Validate mapped objects before returning them. Authentication, if required by a future public source, must not expose private keys in Vite environment variables.

The PWA caches only public GET responses with network-first (4-second fallback); do not put personalized or private data in these endpoints. Service errors are presented with a translated retry action.
