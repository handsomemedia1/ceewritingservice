# Migration Plan

## 1. Objective
Gradually transition the existing `cee-writing-service` repository from a flat structure into the rigorous **Cee Writing Development System (CWDS)** feature-based architecture, without breaking existing production functionality.

## 2. Structural Transition

### Current Structure
```
/
├── src/
│   ├── app/ (flat routing)
│   ├── components/ (monolithic, unorganized)
│   ├── lib/
│   └── utils/
├── bot.ts, *.mjs, *.sql (clutter in root)
```

### Target Structure (CWDS Architecture)
```
/
├── docs/ (Project Bible, Manuals, Feature Specs)
├── src/
│   ├── app/ (API routes and page layouts)
│   ├── components/
│   │   ├── ui/ (reusable Design System components)
│   │   ├── layout/ (Navbar, Footer, Shell)
│   │   └── forms/
│   ├── features/ (Domain-driven modules)
│   │   ├── blog/
│   │   ├── services/
│   │   ├── scholarships/
│   │   ├── resources/
│   │   ├── repository/
│   │   ├── tools/
│   │   ├── search/
│   │   └── dashboard/
│   ├── lib/ (Core configurations, e.g., Supabase, Contexts)
│   ├── services/ (External integrations, e.g., Telegram)
│   ├── types/
│   └── utils/
```

## 3. Component & File Migration Strategy

### A. Files/Components that will be MOVED (No logic changes)
*   **Telegram Bot Scripts:** `bot.ts`, `run_bot.mjs`, `bot_channel.mjs` -> Moved to `src/services/telegram/`.
*   **Database Scripts:** `*.sql` -> Moved to `docs/database/` or a dedicated `supabase/migrations/` folder.
*   **Global Layout Components:** `Navbar.tsx`, `Footer.tsx`, `PageLoader.tsx`, `TelegramBanner.tsx` -> Moved to `src/components/layout/`.

### B. Files/Components that will be REFACTORED
*   **Monolithic Pages (`BlogEditor.tsx`, `HomeClient.tsx`):** Broken down into smaller, focused components within their respective `src/features/` directories.
*   **UI Primitives:** Extract buttons, inputs, and cards from existing components and rebuild them in `src/components/ui/` strictly adhering to the new Design System (incorporating Tailwind CSS).
*   **Routing:** Gradually adopt the new Hub structure (e.g., `/scholarships`, `/research`) by mapping them to their corresponding `features/` directory logic.

### C. Files/Components that should remain UNCHANGED (Protected)
*   `src/components/CurrencySwitcher.tsx` & `src/lib/CurrencyContext.tsx` (Pricing & Geo-IP logic).
*   `src/middleware.ts` & `src/app/auth/` (Supabase Authentication flow).
*   `src/app/api/telegram-webhook/` (Core webhook functionality, though path can be refined later).
*   Existing Supabase tables and RLS policies (we will add to them, not destroy them).

## 4. Phased Execution

*   **Step 1: Scaffolding.** Create the `/docs` structure and the `/src/features/`, `/src/components/ui/`, `/src/services/` directories.
*   **Step 2: Clean Root.** Move bot scripts and SQL files to their new homes. Update `package.json` scripts if necessary.
*   **Step 3: Design System Foundation.** Install Tailwind CSS, configure the CWDS brand colors/typography, and establish the core `ui` components alongside the existing ones.
*   **Step 4: Feature-by-Feature Porting.** Migrate one vertical at a time (e.g., Services Hub first, leaving Blog untouched) into the `/features` architecture.
*   **Step 5: Hub Expansion.** Add the net-new Hubs (Research, Repository) using the established CWDS workflow.

## 5. Potential Risks
1.  **Breaking Imports:** Moving flat components into nested `features/` and `components/` will break relative imports. **Mitigation:** Use TypeScript path aliases (`@/`) aggressively and update systematically.
2.  **Pricing Logic Disruption:** Refactoring the `Packages.tsx` component might break the dynamic currency conversion. **Mitigation:** Wrap the existing logic in a facade or leave the core context entirely untouched during visual refactoring.
3.  **Bot Downtime:** Moving `bot.ts` could break the `npm run telegram-bot` script or webhook paths. **Mitigation:** Test the bot locally after moving scripts and updating `package.json` before deploying.
4.  **SEO Drop:** Changing URL structures for existing pages (like `/blog`) without 301 redirects. **Mitigation:** Ensure existing routes (`/blog`, `/services`) maintain their exact URL paths and metadata during the architectural refactor.
