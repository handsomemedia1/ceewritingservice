# Software Architecture Bible

## 1. Next.js App Router Architecture
We use Next.js 16 (App Router) with a feature-driven folder structure.

## 2. Directory Structure
```
src/
├── app/                  # Next.js Routing, Layouts, API endpoints
├── components/           
│   ├── ui/               # Dumb, reusable design system components (Tailwind)
│   ├── layout/           # Global structural components (Navbar, Footer)
│   └── forms/            # Complex interactive forms
├── features/             # Domain-driven feature modules
│   ├── [feature-name]/
│   │   ├── components/   # Feature-specific UI
│   │   ├── actions/      # Server Actions for mutations
│   │   ├── utils/        # Feature-specific logic
│   │   └── types.ts      # Feature-specific interfaces
├── lib/                  # Global utilities, Contexts (e.g. CurrencyContext)
├── services/             # Third-party integrations (e.g., Telegram, Payment Gateways)
├── styles/               # Global CSS (globals.css transitioning to Tailwind)
└── types/                # Global TypeScript definitions
```

## 3. Data Fetching & Rendering Policy
*   **Static Generation (SSG):** Default for evergreen content (About, Terms).
*   **Incremental Static Regeneration (ISR):** For frequently updated content (Knowledge Hub, Services).
*   **Server-Side Rendering (SSR):** Only for dynamic, user-specific, or real-time data (Dashboard, Cart, Checkout).

## 4. State Management
*   URL Query Parameters for shareable state (filters, search, pagination).
*   React Context strictly for global, slowly-changing state (Currency, Auth, Cart).
*   Local state (`useState`) for isolated UI toggles.

## 5. Security & Database (Supabase)
*   All data access must respect Row Level Security (RLS).
*   Mutations happen via Next.js Server Actions with strict Zod validation.
*   Client-side Supabase client (`@supabase/ssr`) is used sparingly and only for authenticated real-time subscriptions if needed.
