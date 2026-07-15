# Repository Guidelines

## Project Structure & Module Organization

This is a pnpm-based Astro personal site derived from AstroPaper. Source code
lives under `src/`: `pages/` defines routes, including localized `/en` routes;
`components/` contains reusable Astro UI; `layouts/` wraps page templates;
`utils/` holds TypeScript helpers and OG image generation code; `i18n/` stores
translation utilities and labels; `styles/` contains global and typography CSS.
Blog content is stored as Markdown in `src/data/blog/{pt,en}/YYYY/`. Static
assets belong in `public/`, while source icons and images belong in
`src/assets/`. Treat `dist/`, `.astro/`, and `public/pagefind/` as generated
outputs.

## Build, Test, and Development Commands

- `pnpm install`: install dependencies from `pnpm-lock.yaml`.
- `pnpm dev`: start the local Astro development server.
- `pnpm build`: run `astro check`, build the site, generate Pagefind search
  assets, and copy them into `public/pagefind/`.
- `pnpm preview`: serve the built site locally.
- `pnpm lint`: run ESLint across the repository.
- `pnpm format:check`: verify Prettier formatting.
- `pnpm format`: format supported files with Prettier.
- `pnpm sync`: regenerate Astro type metadata when content/config changes.

## Coding Style & Naming Conventions

Use TypeScript with Astro strict settings and the `@/*` alias for imports from
`src`. Prettier enforces 2-space indentation, 80-character lines, semicolons,
double quotes, LF endings, and Tailwind class sorting. Astro components use
PascalCase filenames, utility modules use camelCase or descriptive names, and
blog posts should use kebab-case Markdown filenames. ESLint forbids
`console.*`; remove debug logging before committing.

## Testing Guidelines

There is no dedicated test runner in this repository yet. For every change, run
`pnpm lint`, `pnpm format:check`, and `pnpm build` before opening a PR. If you
add a test framework, keep tests close to the code they cover or under a clear
`tests/` directory, and prefer `*.test.ts` naming for TypeScript utilities.

## Commit & Pull Request Guidelines

Git history and `cz.yaml` follow Conventional Commits, commonly `feat:` and
`fix:`. Use concise imperative subjects, for example
`feat: add archive translation`. Pull requests should include a short summary,
linked issues when applicable, screenshots for visual changes, and the exact
verification commands run. Note any content or localization updates explicitly.

## Configuration Notes

Only public client configuration should use `PUBLIC_` variables, such as
`PUBLIC_GOOGLE_SITE_VERIFICATION`. Do not commit secrets, local environment
files, dependency folders, or generated build output unless the project
explicitly requires it.
