# Image assets

The attempted Unsplash download was blocked by the environment. No external photograph, copied store logo, generated product illustration or AI-generated image is shipped. The five SVG patterns below are original neutral layout placeholders, not representations of products.

Replace exactly these files with licensed real photography, keeping the paths or updating the sample data:

| File                                  | Dimensions        | Use                                                    |
| ------------------------------------- | ----------------- | ------------------------------------------------------ |
| `public/images/hero.svg`              | 1600 × 900 (16:9) | Home slider, first/third slides                        |
| `public/images/product.svg`           | 800 × 1000 (4:5)  | Product photos and missing-image fallback              |
| `public/images/category-square.svg`   | 800 × 800 (1:1)   | Category tiles                                         |
| `public/images/category-portrait.svg` | 750 × 1000 (3:4)  | Tall category, story image and secondary gallery image |
| `public/images/banner.svg`            | 1680 × 720 (21:9) | Home slider, second/fourth slides                      |

Use real, individually matched product photographs for all 24 items; do not reuse one photograph as if it depicts different goods. After replacing `.svg` with WebP/AVIF/JPEG update references in `src/data/sample.ts`, `index.html` preload and page SEO. Keep a neutral SVG as the image-error fallback. Provide multiple source sizes in product data/component srcsets for raster photography. SVG patterns scale natively and currently use a single 800w source candidate.

Record photographer, original source URL, license URL and download date for every replacement here. Current patterns and original wordmark/PWA marks need no third-party image license. Font license files are distributed in the corresponding `@fontsource` packages (SIL Open Font License); Lucide uses ISC.
