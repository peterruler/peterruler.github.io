# PSWeb – Peter Strössler Portfolio

Static personal portfolio website for Peter Strössler, a software engineer in Switzerland. The site presents services, selected web/mobile/AI projects, career history, testimonials, a downloadable CV, and a contact form.

## Technology

- Semantic HTML5
- Compiled utility CSS in `style.css`
- Small dependency-free JavaScript controller in `site.js`
- WebP images and SVG brand assets
- Static hosting with the custom domain `peterstroessler.com`
- Optional Cloudflare Worker proxy configuration in `cloudflare/`

No package installation or build step is required for the current production files.

## Local development

From the repository root, start any static file server. For example:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173/`.

## Important files

| File | Purpose |
| --- | --- |
| `index.html` | Canonical, indexable portfolio homepage |
| `style.css` | Compiled site styles |
| `site.js` | Navigation, scrolling, portfolio filters, year, and form behavior |
| `robots.txt` | Crawler rules and sitemap discovery |
| `sitemap.xml` | Canonical URL submitted to search engines |
| `src/images/site.webmanifest` | Web app metadata and icons |
| `CLAUDE.md` | SEO/PageSpeed change log and maintenance guidance |

The `blog-*.html` and `portfolio-details.html` files are unfinished theme drafts. They are intentionally marked `noindex,follow` and must not be added to the sitemap unless their placeholder content is replaced with unique, production-ready content.

## Updating content

- Keep exactly one descriptive `h1` on the homepage.
- Give every meaningful image a concise, contextual `alt`, explicit `width` and `height`, and use WebP or AVIF where practical.
- Do not lazy-load the hero image. It is the likely Largest Contentful Paint element and is intentionally preloaded with high fetch priority.
- Lazy-load below-the-fold images.
- Update `sitemap.xml`'s `lastmod` after a meaningful public content change.
- Update the CV filename and link together when publishing a new version.
- Keep the canonical URL, Open Graph URL, structured data URL, sitemap URL, and `CNAME` domain aligned.

## Verification before deployment

```bash
node --check site.js
xmllint --noout sitemap.xml
git diff --check
```

Also test the desktop and mobile navigation, every portfolio filter, the CV link, and the contact form validation. After deployment, run PageSpeed Insights for both mobile and desktop and inspect Google Search Console for indexing and Core Web Vitals field data.

## Deployment

The repository is suitable for static hosting such as GitHub Pages. Publish the repository root, retain `CNAME`, and serve the canonical HTTPS origin at `https://peterstroessler.com/`.

