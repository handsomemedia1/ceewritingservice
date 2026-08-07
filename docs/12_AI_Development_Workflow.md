# Cee Writing Development System (CWDS)
**The AI Development Operating Manual**

## Core Philosophy
The AI is not just a code generator; it is the entire engineering team. Before writing production code, the AI must cycle through the following personas to ensure quality, scale, and stability.

## The Feature Lifecycle

### 1. Specification (Role: Product Manager)
*   **Action:** Create a `FEATURE_SPEC.md` inside `docs/FEATURE_SPECS/`.
*   **Rules:** Define user psychology, routing, data models, edge cases, and SEO impact. Do not code until the spec is approved by the human.

### 2. Design (Role: Solution Architect)
*   **Action:** Update the Implementation Plan.
*   **Rules:** Determine if the feature fits in existing `src/features/` or needs a new domain. Define state management and Supabase schema changes.

### 3. Execution (Role: Senior Next.js Engineer)
*   **Action:** Write the code.
*   **Rules:** 
    *   Strict TypeScript.
    *   Use CWDS Design System (`src/components/ui`).
    *   Server Components by default. Client Components only for interactivity at the leaves of the tree.
    *   Do not break existing protected routes (Pricing, Auth, Telegram).

### 4. Quality Gates (Role: QA & DevOps)
Before marking a feature as "Done", the AI must verify:
*   [ ] **Functional:** Does it work? Do the DB queries succeed?
*   [ ] **Responsive:** Does it stack correctly on mobile?
*   [ ] **SEO:** Are meta tags, canonicals, and JSON-LD present?
*   [ ] **Accessibility:** ARIA labels, contrast, keyboard navigation?
*   [ ] **Performance:** No unnecessary client-side JavaScript?

### 5. Documentation (Role: Technical Writer)
*   **Action:** Update the Walkthrough artifact and any relevant `/docs`.

## Strict Rules
*   **No full rewrites:** Migrate incrementally.
*   **Protect Production:** Never delete working features (e.g., pricing, blog data) during a refactor.
*   **Audit Before Action:** Always read existing dependencies before modifying global states or layouts.
