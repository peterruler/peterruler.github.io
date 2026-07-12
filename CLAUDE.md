# SEO and PageSpeed optimization record

This file records the technical SEO, performance, accessibility, and maintainability work applied to PSWeb on 2026-07-12.

## Search appearance and indexation

- Replaced the generic homepage title with a descriptive, intent-focused title covering software engineering, web, apps, and AI.
- Rewrote the German meta description to clearly describe Peter Strössler's services and Swiss location.
- Added a canonical URL for `https://peterstroessler.com/` to consolidate `/` and `/index.html` signals.
- Expanded the robots meta directive to permit large image previews and unrestricted snippets.
- Removed the obsolete keywords meta tag; modern search engines do not use it for ranking.
- Added Open Graph and Twitter Card metadata with title, description, canonical URL, hero image dimensions, and descriptive image alt text.
- Added JSON-LD structured data for `WebSite` and `Person`, including profession, expertise, nationality, image, language, and GitHub identity.
- Kept a single meaningful homepage `h1` and added a semantic `main` landmark.
- Improved service copy, spelling, capitalization, and technology names for clearer topical relevance.
- Replaced the separate `Frontend` and `Backend` service cards with `Fullstack Web` and `AI`. The German AI copy reflects the public GitHub portfolio's scope from computer vision and neural networks through speech/NLP and medical chat systems to LLM applications.
- Changed the footer call-to-action to the consistent formal German wording `Lassen Sie uns sprechen!`.
- Standardized all four service cards with flex-stretched columns and a shared minimum height so the `Angebot` grid remains visually aligned despite different copy lengths.
- Marked the three unfinished placeholder/demo pages `noindex,follow` so they do not dilute the site's indexed content.
- Rebuilt `sitemap.xml` to contain only the canonical homepage and removed duplicate, obsolete CV, and placeholder page URLs.
- Added the sitemap location to `robots.txt` and made the crawl permission explicit.

## Core Web Vitals and PageSpeed

- Preloaded the likely LCP hero image and set `fetchpriority="high"` so discovery begins as early as possible.
- Kept the hero image eager and added its intrinsic `529 × 600` dimensions to reduce layout shift.
- Added intrinsic dimensions to all 28 homepage images, addressing a common CLS cause.
- Added `loading="lazy"` and `decoding="async"` to below-the-fold portfolio and testimonial images.
- Retained WebP for all 22 portfolio previews and the hero image.
- Removed the render-blocking Google Fonts request and changed the site to a fast system font stack.
- Replaced the loaded 196 KB development-mode Webpack bundle (which contained `eval`, Isotope, imagesLoaded, GLightbox, WOW.js, and bundled development scaffolding) with a dependency-free `site.js` of about 6 KB.
- Deleted the obsolete bundle and removed roughly 13 KB of unused GLightbox/animation CSS from the production stylesheet.
- Removed multiple inline runtime scripts and consolidated behavior into one deferred file.
- Reimplemented scrolling, sticky navigation, back-to-top behavior, portfolio filters, current year, and contact validation without external dependencies.
- Throttled scroll work with `requestAnimationFrame` and registered the listener as passive.
- Added reduced-motion handling to programmatic smooth scrolling.
- Fixed the homepage's missing closing `head` tag and removed a JavaScript syntax error in the former inline contact script.
- Corrected the manifest icon paths so installed-app icons resolve from their actual location.

## Accessibility and quality signals

- Replaced generic image alternatives such as `image`, `logo`, and theme names with descriptive text.
- Added accessible names, autocomplete hints, and field purpose metadata to the contact form.
- Added `type="button"`, `aria-pressed`, and accurate filter state to portfolio filter controls.
- Added `aria-controls` and `aria-expanded` to the mobile navigation control.
- Added a descriptive label and real fragment URL to the back-to-top link instead of `javascript:void(0)`.
- Added `rel="noopener noreferrer"` to links that open a new tab.
- Changed the logo link to the canonical root URL and gave the logo explicit dimensions.

## Validation performed

- Rendered the site locally in the in-app browser at desktop and mobile widths.
- Confirmed the page exposes one `h1`, the intended canonical URL and description, and only one external JavaScript resource (`site.js`).
- Confirmed all 28 homepage images have alt text and explicit dimensions.
- Confirmed the initial Featured filter shows five projects and the Web filter switches to seven projects.
- Confirmed the mobile menu opens and updates `aria-expanded` correctly.
- Confirmed there are no browser console warnings or errors during the tested interactions.
- Validated JavaScript syntax, sitemap XML, manifest JSON, internal asset references, and whitespace with local checks.

## Deployment follow-up

Lab performance should be measured again after deployment because production scores depend on the host, caching, compression, network, device, and real server response time. Run PageSpeed Insights on both mobile and desktop, then monitor Search Console Core Web Vitals field data. A score is not recorded here because the optimized files were tested locally rather than deployed to the public origin.

After release:

1. Submit `https://peterstroessler.com/sitemap.xml` in Google Search Console.
2. Request re-indexing of `https://peterstroessler.com/`.
3. Check the URL Inspection result for the chosen canonical.
4. Run Rich Results Test or Schema Markup Validator against the deployed homepage.
5. Track LCP, CLS, and INP field data over the following weeks.

## Guardrails for future changes

- Do not add `/index.html`, query-string variants, CV PDFs, or `noindex` drafts to the sitemap.
- Do not lazy-load the hero/LCP image.
- Do not restore `bundle.js` unless a production-minified build and a real feature requirement justify its cost.
- Keep nonessential scripts deferred and dependency-free where practical.
- New public pages need unique titles, descriptions, canonical URLs, headings, meaningful copy, internal links, and sitemap entries.
- Placeholder or duplicate pages must remain `noindex` until completed.
- Do not claim that SEO changes guarantee a ranking increase; quality, relevance, authority, competition, and real-user performance also affect rankings.
