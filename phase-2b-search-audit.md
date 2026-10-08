### PHASE 2B SEARCH AUDIT

#### 1. Overall Status
- FAIL
- Reason: Blog post searching silently fails due to invalid schema references, breaking a core entity. While Services and Packages return results, the overall system relies on uncaught Promise.all behavior that masks fatal DB query errors.

#### 2. Search Architecture
- **Searched Entities**: Services, Blog Posts (Knowledge Hub), Packages.
- **Tables**: `blog_posts`, `services`, `packages`, `categories`.
- **Fields**:
  - Services: `id`, `name`, `desc_text`, `slug`, `category_id`.
  - Packages: `id`, `name`, `desc_text`.
  - Blog Posts: `id`, `title`, `meta_description`, `slug`, `topic_pillar`, `difficulty`, `estimated_read_time`, `published_at`, `tags`, `content` (via `.or`).
- **Ranking approach**: A custom TS `calculateScore` applies weights (100 for exact title, 50 for partial title, 20 for description, 10 for category, 10 for tags). Results are sorted by score descending, then alphabetically.
- **Normalization approach**: Database rows are mapped into a unified `SearchResult` TS interface standardizing `title`, `description`, `url`, `type`, `category`, and UI flags.

#### 3. Entity Coverage

| Entity | Searchable? | Fields Verified? | Issues |
|---|---|---|---|
| Services | Yes | Yes | None. |
| Blog Posts | No (Silently Fails) | No | Query requests `topic_pillar`, `difficulty`, `estimated_read_time` which do not exist in `blog_posts`, causing silent DB failure. Furthermore, `content` matches are accidentally filtered out in TS by `if (!matchesText && !matchesTag) return;`. |
| Packages | Yes | Yes | None. |
| Resources | No | N/A | Intentional or unimplemented gap; `resources` table is entirely absent from `SearchEngine.ts`. |

#### 4. Search Test Results

| Query | Expected | Actual | Result | Notes |
|---|---|---|---|---|
| "resume" | 1+ Service | 1 Service | PASS | Successfully matches "CV / Resume Writing". |
| "thesis" | 1+ Service | 1 Service | PASS | Matches "PhD Thesis Writing (Doctoral)". |
| "Mastering the Literature Review" | 1 Blog Post | 0 Results | FAIL | `blog_posts` query silently throws schema error. |
| "Literature" | 1+ Blog Post | 0 Results | FAIL | Schema error masks all blog results. |
| "Job Seeker Pack" | 1 Package | 1 Package | PASS | Successfully matches the exact package. |
| "xyznonexistent98765" | 0 Results | 0 Results | PASS | Safely handled, displays empty state. |
| "" (Empty) | 0 Results | 0 Results | PASS | Skips DB entirely, shows hero prompt. |

#### 5. Ranking Audit
The intended ranking model (100 exact, 50 partial, 20 content, 10 category/tag) is implemented with discrepancies:
- `exactDesc` (+20) only checks descriptions. `content` (from blogs) is ignored for scoring because it is not selected from the DB and not passed to `calculateScore`.
- Title matches are exclusive (`if... else if`), but description/category matches are additive. An exact title match (+100) that also appears in the description (+20) scores 120.

#### 6. Schema Audit
- **Valid references**: `services` (id, name, desc_text, slug, category_id); `packages` (id, name, desc_text); `categories` (id, name).
- **Invalid references**: `blog_posts.topic_pillar`, `blog_posts.difficulty`, `blog_posts.estimated_read_time`.
- **Uncertain references**: `blog_posts.tags` exists but relies on a TS array search workaround. `content` exists but is dropped by subsequent TS logic.

#### 7. Next.js 16 Audit
- `searchParams` handling is correct. `searchParams` is treated as a `Promise<{ q?: string }>` and correctly awaited via `const { q } = await searchParams;` in `page.tsx` before usage.

#### 8. URL Audit
- Every result type generates valid public URLs (`/services/${service.slug}`, `/#packages`, `/blog/${post.slug}`). No broken URLs were observed in successful hits.

#### 9. Error Handling Audit
- **Silent Failures**: `Promise.all` executes the Supabase queries. Because Supabase `.select()` handles errors by returning `{ data: null, error: PostgrestError }` rather than throwing, `Promise.all` assumes success. 
- The subsequent code uses `if (blogRes.data)` which silently skips rendering blog posts if an error occurred, hiding the failure from users but completely breaking blog search.

#### 10. UX Audit
- Empty states and no-result states render correctly. Category filters work smoothly on the client.

#### 11. Recommended Fixes

- **File**: `src/features/search/utils/SearchEngine.ts`
- **Issue**: Invalid `blog_posts` columns cause silent failure.
- **Why it matters**: Blog posts are completely unsearchable in production.
- **Recommended Change (P0)**: Remove `topic_pillar`, `difficulty`, `estimated_read_time` from the `.select()` query for `blog_posts`.

- **File**: `src/features/search/utils/SearchEngine.ts`
- **Issue**: Missing error checking on Supabase results.
- **Why it matters**: DB errors are silently swallowed, masking critical schema bugs.
- **Recommended Change (P1)**: Explicitly log and/or safely handle `error` objects from `blogRes`, `servicesRes`, and `packagesRes`.

- **File**: `src/features/search/utils/SearchEngine.ts`
- **Issue**: `content` matches are dropped by TS filtering.
- **Why it matters**: If a user searches for a term only found in a blog's body, the DB returns it, but TS drops it.
- **Recommended Change (P2)**: Include `content` in `.select()` (or substring it) and include it in the TS filtering condition (`matchesText || matchesTag || matchesContent`).

- **File**: `src/features/search/utils/SearchEngine.ts`
- **Issue**: Resources are excluded from unified search.
- **Why it matters**: Users cannot search for free resources.
- **Recommended Change (P3)**: Add a fourth `Promise.all` query targeting the `resources` table if business logic dictates they should be searchable.

#### 12. Production Verification
- **Production URL tested**: `https://ceewriting.com/search`
- **Queries tested**: "resume", "thesis", "Job Seeker Pack", "Literature", "xyznonexistent98765", ""
- **HTTP status results**: 200 OK (no 500s)
- **Runtime errors observed**: None (silent logic failures only)
- **Broken search/result URLs observed**: None

#### 13. Final Recommendation
READY FOR SEARCH FIX IMPLEMENTATION
