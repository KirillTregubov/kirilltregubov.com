# TODO

Improvements found in the site audit (2026-11-24). Ordered by impact.
Check items off as they land.

## Performance

- [x] **Optimize OverBuddy gallery images.**
      `public/assets/projects/overbuddy/` holds 107 JPGs (~334 MB, mostly 2–5 MB
      each) that render at 472×265. `<Image>` with a string path from `public/`
      is not optimized, so the original file is served. Load them as local
      images (e.g. `import.meta.glob` over `src/assets/...`) so Astro emits
      WebP/AVIF thumbnails with `srcset`. Keep the full-size originals
      downloadable where a "view full image" link exists.
- [x] **Optimize project preview images on the homepage** (same `public/`
      string-path issue in `ProjectPreview.astro`).
- [x] **Load snow only in season.** `src/components/Snow.tsx` creates the
      snowflake `<img>` at module load and bundles `react-snowfall` on every
      page. Keep the runtime date check in the browser (no rebuild needed) and
      lazy-import the effect only during Dec 1 – Jan 5.
- [x] **Compress `public/assets/Saturn.glb` (5.3 MB)** with Draco/meshopt
      (`gltf-transform optimize`). Requires a matching decoder in the loader.
      Done: geometry was only ~90 KB; the 4096×3072 PNG planet texture was the
      cost. Planet texture → 2048×1536 WebP (q90), rings kept as lossless PNG.
      5.48 MB → 173 KB, no decoder needed.
- [ ] **Reduce hydration on the homepage.** `ProjectTitle`, `ProjectToggle`,
      `ProjectList` all use `client:load`, and `ProjectList` wraps the whole
      grid. `Age` hydrates React to print one number — compute at build time
      with a tiny inline script that updates it in the browser.

## SEO & discoverability

- [ ] **Add a sitemap** (`@astrojs/sitemap`) and exclude `/dev/**` and
      `/embed/**`.
- [ ] **Add `robots.txt`** pointing to the sitemap.
- [ ] **Add an RSS feed** for the blog (`@astrojs/rss`) plus
      `<link rel="alternate" type="application/rss+xml">` in the layout.
- [ ] **Add `<link rel="canonical">`** in `Layout.astro`.
- [ ] **Give the homepage an `<h1>`.** The name in the hero is a `Highlight`
      span, so the page has no top-level heading.
- [ ] **Add a light `theme-color`** meta (currently commented out) or remove
      the dead comment.

## Correctness & accessibility

- [ ] **Fix duplicate `id="tech-stack"`** in `src/pages/index.astro`. Give
      "Tools & Services" its own id and add `aria-labelledby` to both
      sections, matching the Writing section.

## Cleanup

- [ ] **Remove the commented-out Work Experience section** (~200 lines) from
      `src/pages/index.astro`; it lives in git history.
- [ ] **Remove `src/pages/_max-verstappen.astro.backup`.**
- [ ] **Centralize site constants** (default description, `@KirillTregubov_`
      handle, site name) in one module.

## Deferred

- [ ] **TypeScript 7.** 7.0 is the native compiler; `@astrojs/check` depends
      on the TypeScript JS API. Upgrade on a separate branch once
      `@astrojs/check` supports it.
