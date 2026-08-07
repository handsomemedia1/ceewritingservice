# Current State Audit

## Overview
This document serves as the baseline audit of the `cee-writing-service` repository prior to the architectural migration toward the **Cee Writing Development System (CWDS)**.

## 1. Existing Routes (`src/app`)
*   `/(admin)` - Admin dashboard routes.
*   `/about` - About page.
*   `/admin` - Main CMS/admin entry.
*   `/api` - Backend route handlers (`cron`, `geo`, `scholarship`, `seo`, `telegram-webhook`).
*   `/auth` & `/login` - Authentication routes.
*   `/blog` - Knowledge hub (CMS-driven).
*   `/faq` - Frequently asked questions.
*   `/privacy` & `/terms` - Legal pages.
*   `/resources` - Free resources / downloads.
*   `/scholarship-check` - Early iteration of the Tools Hub.
*   `/services` - Services Hub.
*   `/writers` - Profile/management for writers.

## 2. Existing Components (`src/components`)
Currently, components are stored in a flat directory structure. Many are monolithic and handle data fetching, state, and UI combined.
*   **Core Pages:** `HomeClient.tsx`, `AboutClient.tsx`, `ResourcesClient.tsx`.
*   **Services & Pricing:** `Packages.tsx`, `ServicesSection.tsx`, `HotServices.tsx`, `CurrencySwitcher.tsx`.
*   **Blog/CMS:** `BlogEditor.tsx` (using TipTap), `BlogPreview.tsx`.
*   **Layout/Global:** `Navbar.tsx`, `Footer.tsx`, `PageLoader.tsx`, `PageTransition.tsx`, `FloatingCart.tsx`, `TelegramBanner.tsx`.
*   **SEO:** `JsonLd.tsx`.

## 3. Existing Database Tables (Supabase)
Based on `supabase_schema.sql` and patch files:
*   `profiles` - Users, writers, admins (linked to `auth.users`).
*   `blog_posts` - Core CMS table with status (`draft`, `published`), SEO scores, etc.
*   `categories` & `faqs` - Organizational tables.
*   `services` & `packages` - Core pricing and service offerings.
*   `orders` & `resources` - Tracked via schema patches.
*   **Storage:** `blog-images` bucket.

## 4. SQL / Database Script Audit
The root directory contains multiple SQL files indicating manual schema evolution:
*   **Base Schema:** `supabase_schema.sql`
*   **Seed Data:** `seed_services.sql`
*   **Active Migrations / Patches:**
    *   `bot_dedup_table.sql`
    *   `currencies_schema_patch.sql`
    *   `orders_schema_patch.sql`
    *   `packages_and_services_schema_patch.sql`
    *   `resource_tracking_patch.sql`
    *   `resources_schema_patch.sql`
    *   `writer_approval_patch.sql`
*   **Utility:** `create_blog_images_bucket.sql`, `force_confirm_emails.sql`
*   *Action Plan:* Do not delete. Move to `docs/database/` for reference. Set up formal `supabase/migrations/` going forward.

## 5. CSS Architecture & Design System Audit
Based on `src/app/globals.css`:
*   **Tokens:** Utilizes CSS variables heavily for brand colors (`--navy`, `--gold`, `--cream`), sizing, and effects (`--clay-shadow`, `--glass-bg`).
*   **Typography:** Playfair Display (serif) and Inter (sans-serif).
*   **Custom UI Classes:** Heavily relies on bespoke classes (`.btn-gold`, `.glass-card`, `.navbar.scrolled`, `.reveal`).
*   **Animations:** Complex keyframe animations (`meshMove`, `orbFloat`, `waPulse`) tied to specific DOM elements.
*   *Action Plan for Tailwind:* We **MUST NOT** delete `globals.css` or replace it entirely. Tailwind must be installed and configured to consume these CSS variables in `tailwind.config.ts`. Existing classes (e.g., `.btn-gold`) will be preserved until their components are fully refactored into the new CWDS UI library.

## 6. Existing Supabase Integrations
*   Uses `@supabase/ssr` and `@supabase/supabase-js`.
*   **Auth:** Handled via `src/middleware.ts` (session updates) and the `/auth` routes.
*   **RLS:** Policies are strictly defined for `profiles`, `blog_posts`, etc.

## 7. Existing APIs (`src/app/api`)
*   `/cron`, `/geo`, `/scholarship`, `/seo`, `/telegram-webhook`.

## 8. Existing Authentication Flow
*   Powered by Supabase Auth (`middleware.ts` intercepts requests).
*   `on_auth_user_created` Postgres trigger automatically creates `profiles`.

## 9. Existing Environment Variables
*   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## 10. Existing SEO Implementation
*   `layout.tsx` global metadata. `JsonLd.tsx`, `sitemap.ts`, `robots.ts`.

## 11. Existing Pricing System
*   **Logic:** Housed in `CurrencyContext`, `CurrencySwitcher.tsx`, and `Packages.tsx`.
*   *Status: Critical business logic. Protected route.*

## 12. Existing Telegram Integrations
*   **Scripts:** `bot.ts`, `run_bot.mjs`, `bot_channel.mjs`, `register_webhook.mjs`.
*   *Status: Protected scripts. Will be moved to `/services/telegram` later.*
