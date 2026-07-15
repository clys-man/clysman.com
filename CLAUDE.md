# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal website and blog built on [Astro](https://astro.build) (a fork of the AstroPaper theme). Static-site generation, Tailwind CSS v4, TypeScript in strict mode, Pagefind for search, and dual-language (Portuguese/English) content.

## Commands

- `npm run dev` — start the Astro dev server
- `npm run build` — runs `astro check` (type check), `astro build`, then indexes the site with Pagefind and copies the index into `public/`. The Pagefind step means search only works after a full build, not in `dev`.
- `npm run preview` — preview the production build
- `npm run lint` — ESLint (note: `no-console` is an **error**, so no stray `console.*` in committed code)
- `npm run format` / `npm run format:check` — Prettier (write / check)
- `npm run sync` — regenerate `.astro/` content collection types after schema changes

No test suite exists.

## Import alias

`@/*` maps to `src/*` (see `tsconfig.json`). Use it instead of relative paths, e.g. `import { SITE } from "@/config"`.

## Architecture

### Configuration
- `src/config.ts` — the `SITE` object: site URL, author, pagination sizes, timezone, feature toggles (archives, OG images, light/dark mode). Most global behavior is driven from here.
- `src/constants.ts` — `SOCIALS` and `SHARE_LINKS` arrays (icon components + URLs).
- `astro.config.ts` — Markdown pipeline: KaTeX math (`remark-math` + `rehype-katex`), TOC/collapse, and Shiki with `catppuccin-latte`/`catppuccin-mocha` themes plus notation transformers (diff/highlight) and a custom `transformerFileName` from `src/utils/transformers/`.

### Content collections
Defined in `src/content.config.ts`. Two collections loaded via the glob loader:
- `blog_pt` ← `src/data/blog/pt/` (Portuguese, the default language)
- `blog_en` ← `src/data/blog/en/` (English)

Both share `blogSchema` (frontmatter: `title`, `pubDatetime`, `description`, optional `modDatetime`, `tags`, `featured`, `draft`, `ogImage`, `timezone`, etc.). Files prefixed with `_` are ignored by the glob pattern. Posts live under year subdirectories (e.g. `.../2025/`).

### Internationalization (central concern)
Default language is **`pt_BR`** and is served at the root (no path prefix). English is served under the `/en/` prefix.

- `src/i18n/ui.ts` — `ui` object holds every translation string keyed by dotted names (`nav.about`, `pages.posts.title`, `months.1`…). `defaultLang = "pt_BR"`. When adding UI text, add the key to **both** `en` and `pt_BR`.
- `src/i18n/utils.ts` — helpers:
  - `getLangFromUrl(url)` — reads lang from the first path segment.
  - `useTranslations(lang)` → `t(key)` — falls back to `defaultLang` if a key is missing.
  - `getCollectionName(lang)` — maps a lang to its collection (`pt_BR` → `blog_pt`, else `blog_${lang}`).
  - `getLocalizedPath` / `getAlternatePath` / `getAlternateLang` — build language-prefixed URLs and the language-toggle link.

Routing mirrors this: default-language pages live directly under `src/pages/` (`index.astro`, `about.astro`, `posts/[...page].astro`, `tags/`, `archives/`), and English equivalents are duplicated under `src/pages/en/`. When adding or changing a page or its routing, update **both** the root and the `/en/` variant, and select the collection with `getCollectionName`.

### Rendering structure
- `src/layouts/` — `Layout.astro` (base HTML/head/SEO), plus `Main.astro`, `PostDetails.astro`, `AboutLayout.astro`.
- `src/components/` — presentational `.astro` components (`Header`, `Footer`, `Card`, `Pagination`, etc.).
- `src/utils/` — post helpers (`getSortedPosts`, `getPostsByTag`, `getUniqueTags`, `postFilter`, `slugify`) and OG-image generation (`generateOgImages.ts` + `og-templates/` using Satori/resvg; `loadGoogleFont.ts`).
- `src/pages/og.png.ts`, `rss.xml.ts`, `robots.txt.ts` — dynamically generated endpoints.

### Styling
Tailwind CSS v4 via the Vite plugin; the stylesheet entry is `src/styles/global.css` (referenced by `prettier-plugin-tailwindcss` as `tailwindStylesheet`). Prettier auto-sorts Tailwind classes.

## Deployment
A `Dockerfile` and `docker-compose.yml` are present for containerized serving of the built static site.
