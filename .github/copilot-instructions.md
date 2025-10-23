
# Copilot Instructions for AI Coding Agents

## Architecture & Structure
- **Monorepo:** Next.js (App Router) with TypeScript, Tailwind CSS, and pnpm. Modular, feature-based foldering.
- **Routes:** All main features (blog, admin, services, etc.) are under `app/`, each with its own subfolder and `page.tsx` entry.
- **UI Components:** Shared and domain-specific React components in `components/`, with reusable primitives in `components/ui/`.
- **State/Context:** Context providers (e.g., `responsive-context.tsx`, `theme-provider.tsx`) are colocated in `components/`.
- **Type Safety:** All domain models/types are in `types/` (e.g., `types/blog.ts`, `types/seo.tsx`).
- **API Layer:** External data (Sanity CMS) via `lib/sanity-client.ts` and queries in `lib/queries.ts`. Local API logic in `app/api/`.
- **SEO & Sitemaps:** Managed by config files (`next-seo.config.js`, `next-sitemap.config.js`) and custom components (`components/seo-head.tsx`). Static routes for robots/sitemap in `app/robots.txt/`, `app/sitemap.xml/`.

## Developer Workflows
- **Install:** `pnpm install` (always use pnpm)
- **Dev server:** `pnpm dev`
- **Build:** `pnpm build`
- **Lint:** `pnpm lint`
- **Format:** `pnpm format`
- **Tailwind:** Configured via `tailwind.config.ts` and `postcss.config.mjs`

## Project-Specific Patterns
- **Routing:** Each folder in `app/` is a route; use `page.tsx` as entry. Nested routes for features (e.g., `app/blog/blog-details/`).
- **Component Usage:** Extend or reuse from `components/ui/` for consistent UI. Reference domain components for feature-specific logic.
- **Type Usage:** Always import types from `types/` for new models and API responses.
- **Error Handling:** Use `components/error-boundary.tsx` for React error boundaries.
- **Context:** Use context providers from `components/` for theme/responsive logic.
- **API Integration:** For Sanity CMS, use `lib/sanity-client.ts` and `lib/queries.ts`. For local APIs, use `app/api/` endpoints.
- **SEO:** Update both config files and `components/seo-head.tsx` when changing SEO logic.

## Integration Points
- **Sanity CMS:** All external content/data via `lib/sanity-client.ts` and queries in `lib/queries.ts`.
- **SEO/Sitemap:** Static files and config in `app/robots.txt/`, `app/sitemap.xml/`, and root config files.
- **Assets:** Use `public/` for images, PDFs, videos, and SEO files.

## Examples
- **Add blog page:** Create folder under `app/blog/`, add `page.tsx`, use types from `types/blog.ts`.
- **Add UI element:** Extend/create in `components/ui/`, import as needed.
- **Add API route:** Place in `app/api/`, follow Next.js API conventions.

---
_If any section is unclear, incomplete, or missing, please provide feedback for improvement._
