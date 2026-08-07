/**
 * Unified Search Analytics
 * Tracks search behaviour to guide future content and platform improvements.
 */

export const trackSearchQuery = (query: string, resultCount: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag && query.trim()) {
    (window as any).gtag('event', 'search', {
      search_term: query,
      result_count: resultCount,
      zero_results: resultCount === 0
    });
  }
};

export const trackSearchResultClick = (
  query: string,
  resultId: string,
  resultType: string,
  resultTitle: string,
  rank: number
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'search_result_click', {
      search_term: query,
      result_id: resultId,
      result_type: resultType,
      result_title: resultTitle,
      rank: rank
    });
  }
};

export const trackSearchRefinement = (oldQuery: string, newQuery: string, newFilter: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'search_refinement', {
      previous_search_term: oldQuery,
      new_search_term: newQuery,
      category_filter: newFilter
    });
  }
};
