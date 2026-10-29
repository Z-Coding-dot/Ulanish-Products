# Image assets

## Editorial photography

Downloaded on 2026-10-28. These editorial sample images illustrate catalog themes; they are not photographs of Ulanish's premises or actual stock. Each photo is stored locally as optimized WebP at 1600 x 900 and 800 x 450; responsive srcset selects the appropriate size. No runtime third-party image requests are needed.

| Files in public/images/                        | Theme                    | Photographer            | Original source                                                                                                                                                                 | License                                                                                                                                                  |
| ---------------------------------------------- | ------------------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hero-collection.webp, hero-collection-800.webp | Retail collection        | Clark Street Mercantile | [Store Organization](https://unsplash.com/photos/qnKhZJPKFD8), CDN photo 1441986300917-64674bd600d8                                                                             | [Unsplash License](https://unsplash.com/license); also [archived under CC0](<https://commons.wikimedia.org/wiki/File:Store_Organization_(Unsplash).jpg>) |
| hero-office.webp, hero-office-800.webp         | Office essentials        | Kari Shea               | [Desk and workspace](https://unsplash.com/photos/black-2-light-torchiere-beside-brown-wooden-top-desk-with-black-steel-frame-tOVmshavtoo), CDN photo 1486946255434-2466348c2166 | [Unsplash License](https://unsplash.com/license)                                                                                                         |
| hero-home.webp, hero-home-800.webp             | Home and living          | Minh Pham               | [Living room](https://unsplash.com/photos/a-living-room-filled-with-furniture-and-a-large-window-OtXADkUh3-I), CDN photo 1583847268964-b28dc8f51f92                             | [Unsplash License](https://unsplash.com/license)                                                                                                         |
| hero-discover.webp, hero-discover-800.webp     | Technology and discovery | Kari Shea               | [Desktop workspace](https://unsplash.com/photos/macbook-pro-beside-silver-monitor-on-table-3hlQ2ty9kUY), CDN photo 1518472803163-8d3a9e90792c                                   | [Unsplash License](https://unsplash.com/license)                                                                                                         |

Download URLs use https://images.unsplash.com/photo-{CDN photo}?fit=crop&w={width}&h={height}&q={quality}&fm=webp, with quality 82 for desktop and 78 for mobile.

The same licensed files are reused in page headers, category tiles, and the Home/About story sections. Electronics uses the desktop workspace, home uses the living room, office uses the desk, and accessories uses the retail interior. The digital category uses a Lucide laptop icon. Story photos have descriptive alt text in all three languages.

## Remaining neutral placeholders

Product cards, detail galleries, and search thumbnails share representative Lucide icons for sample items with missing, failed, or neutral placeholder images. Gallery icons are labeled as illustrative and omit photo zoom controls when no actual photos exist. Icons identify the product type and do not claim to show actual inventory. They use the existing Lucide ISC license, as do the ordering, About, category, and 404 icons.

The original SVG patterns below remain as legacy sample-data values or fallback assets, not representations of products. Product artwork components recognize the catalog patterns and display icons instead. Replace sample image paths with individually matched, licensed photos when actual catalog photography is available.

| File                                | Dimensions        | Use                                                    |
| ----------------------------------- | ----------------- | ------------------------------------------------------ |
| public/images/hero.svg              | 1600 x 900 (16:9) | Slider image-error fallback                            |
| public/images/product.svg           | 800 x 1000 (4:5)  | Legacy sample product marker, rendered as an icon      |
| public/images/category-square.svg   | 800 x 800 (1:1)   | Reserved legacy category pattern                      |
| public/images/category-portrait.svg | 750 x 1000 (3:4)  | Legacy secondary product marker, omitted from galleries |
| public/images/banner.svg            | 1680 x 720 (21:9) | Reserved banner placeholder                            |

Do not reuse one product photograph as if it depicts different goods. Update references in src/data/sample.ts and add responsive image candidates when real product photography is supplied. Record photographer, source, license and download date here for future replacements.

Original patterns and wordmark/PWA marks need no third-party image license. Font licenses are distributed in the corresponding @fontsource packages (SIL Open Font License); Lucide uses ISC.
