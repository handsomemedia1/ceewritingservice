# CWDS Migration Checklist - Phase 1

This checklist governs the safe, incremental migration of the `cee-writing-service` repository into the CWDS architecture.

## Pre-Migration Requirements
- [x] Create migration branch (`architecture-migration-phase-1`)
- [x] Complete architecture audit (`current-state-audit.md`)
- [x] Complete CSS audit & strategy
- [x] Complete SQL audit & strategy

## Stage 1: Documentation & Scaffolding (Non-Breaking)
- [ ] Create `/docs` directory structure.
- [ ] Generate the 17 specification documents (Project Bible).
- [ ] Scaffold `src/features/` directory (empty).
- [ ] Scaffold `src/components/ui/` directory (empty).
- [ ] Scaffold `src/components/layout/` directory (empty).
- [ ] Scaffold `src/services/telegram/` directory (empty).
- [ ] Scaffold `docs/database/` directory.

## Stage 2: Database Scripts Migration (Non-Breaking)
*Goal: Organize loose SQL files.*
- [ ] Move `*.sql` files to `docs/database/` for reference.
- [ ] Initialize `supabase/migrations/` if local dev is configured, else rely on `docs/database`.
- [ ] **Checkpoint:** Verify application still builds and runs correctly.

## Stage 3: Telegram Scripts Migration (Low Risk)
*Goal: Organize backend bot logic.*
- [ ] Move `bot.ts`, `bot_channel.*`, `run_bot.mjs`, `register_webhook.mjs`, `start_bot.vbs` to `src/services/telegram/`.
- [ ] Update `package.json` scripts (`telegram-bot`) to point to the new path.
- [ ] **Checkpoint:** Run `npm run telegram-bot` locally to ensure it starts without path errors.

## Stage 4: CSS & Tailwind Integration (High Risk - Visuals)
*Goal: Introduce Tailwind without breaking existing global styles.*
- [ ] Install Tailwind CSS, PostCSS, and dependencies.
- [ ] Initialize `tailwind.config.ts`.
- [ ] Map existing CSS variables (from `globals.css`) into the Tailwind theme configuration (e.g., `colors: { navy: 'var(--navy)' }`).
- [ ] Import Tailwind directives at the top of `globals.css` (keeping existing `.btn-gold`, `.glass-card`, etc., intact below it).
- [ ] **Checkpoint:** Run `npm run dev`. Visually audit the Homepage, Blog, and Services pages. Ensure existing custom classes still override/work properly and no layout shifts occurred.

## Stage 5: Foundation UI Components
- [ ] Introduce the first CWDS components in `src/components/ui/` (e.g., `Button.tsx`, `Card.tsx`) using Tailwind classes.
- [ ] Ensure they coexist with the old `src/components/` files.
- [ ] Do not replace any production UI yet.

## Stage 6: Final Phase 1 Audit
- [ ] Verify functionality (No broken links, auth works, pricing works).
- [ ] Verify responsiveness of existing pages.
- [ ] Verify SEO (`sitemap.xml`, meta tags still render).
- [ ] Create Pull Request for `architecture-migration-phase-1`.
