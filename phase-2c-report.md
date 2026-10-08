### PHASE 2C — RESOURCES SEARCH IMPLEMENTATION REPORT

1. **Files changed**
   - `src/features/search/utils/SearchEngine.ts`

2. **Resources schema/fields actually used**
   - Verified via direct DB querying. Used: `id`, `title`, `subtitle`, `description`, `category`, and `features`. Safe, accurate schema reference (no slug or download_url invented).

3. **Resource search fields**
   - **title**: Searched via Supabase `.ilike`.
   - **subtitle**: Searched via Supabase `.ilike`.
   - **description**: Searched via Supabase `.ilike`.
   - **category**: Searched via Supabase `.ilike`.
   - **features**: Array explicitly searched via TypeScript fallback matching (`.some(...)`), ensuring compatibility with string arrays without breaking PostgREST logic.

4. **Resource scoring**
   - **exact title**: 100 points
   - **partial title**: 50 points
   - **description/subtitle**: 20 points (Combined `subtitle + description` passed into `calculateScore`)
   - **category**: 10 points
   - **features**: 10 points (Passed via `tagsArray` slot in `calculateScore`)

5. **Resource result URL**
   - Confirmed mapped to `/resources` explicitly.
   - Confirmed NO fake individual resource URLs were generated.

6. **Error handling**
   - Added `resourcesRes` to the `Promise.all` alongside Services/Blog/Packages.
   - Specifically extracted and logged `resourcesRes.error` independently if it fails, successfully isolating any Resources DB failure from affecting other search entity loops.

7. **Deduplication behavior**
   - Resources are deduplicated intrinsically by the architecture. Supabase returns unique rows by ID, and they are processed linearly via `.forEach`. A resource cannot be duplicated regardless of how many feature/category fields matched.

8. **Search test results**

| Query | Expected | Actual | Score | Status |
|---|---|---|---:|---|
| "Turnitin Score Guide Nigeria" | `Turnitin Score Guide Nigeria` (Resource) | `Turnitin Score Guide Nigeria` | 100 | PASS |
| "Turnitin" | Mix of Blogs & Resources | Top: `Don't Submit...` (Blog) | 80 | PASS |
| "Acceptable ranges for Nigerian" | `Turnitin Score Guide Nigeria` (Resource) | `Turnitin Score Guide Nigeria` | 20 | PASS |
| "Academic" | Mix of Blogs & Resources | Resources triggered successfully | 10 | PASS |
| "How to fix a high score" | `Turnitin Score Guide Nigeria` (Resource) | `Turnitin Score Guide Nigeria` | 30 | PASS |
| "resume" (Regression) | `CV / Resume Writing` (Service) | `CV / Resume Writing` | 50 | PASS |
| "thesis" (Regression) | Master's Thesis Data (Blog) | Master's Thesis Data | 80 | PASS |
| "Job Seeker Pack" (Regression) | `Job Seeker Pack` (Package) | `Job Seeker Pack` | 100 | PASS |
| "How to Write a Lit..." (Regression) | `How to Write a Literature...` | `How to Write a Literature...` | 100 | PASS |
| "shark attacks" (Regression) | Pearson Correlation (Blog) | Pearson Correlation | 20 | PASS |
| "xyznonexistent98765" (Regression)| 0 results | 0 results | N/A | PASS |
| "" (Empty) (Regression) | 0 results | 0 results | N/A | PASS |

9. **Resource hub HTTP result**
   - `https://ceewriting.com/resources` confirmed returning HTTP 200 via test.

10. **npm run build result**
   - `✓ Compiled successfully in 42s`. Complete SSG generation succeeded.

11. **git diff --check result**
   - Clean. No new trailing whitespaces introduced in `SearchEngine.ts`. Ignored pre-existing legacy whitespace files.

12. **Final diff scope**
   - Only `src/features/search/utils/SearchEngine.ts` modified. The changes were strictly bound to introducing the 4th `resourcesRes` query, logging its errors, mapping its features/content matching, and appending it to the normalized results array as type `'Resources'`. No extraneous refactoring occurred.

13. **Remaining issues**
   - None within the Phase 2C scope.

14. **Production deployment**
   - NOT DEPLOYED.
