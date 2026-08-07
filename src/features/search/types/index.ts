export type SearchCategory = 'All' | 'Knowledge Hub' | 'Services' | 'Resources' | 'Scholarships';

export interface SearchResult {
  id: string;
  type: SearchCategory;
  title: string;
  description: string;
  url: string;
  icon: string;
  
  // Metadata for result cards
  category?: string;
  difficulty?: string;
  readTime?: string;
  lastUpdated?: string;
  
  // Ranking signals (internal use)
  _exactTitleMatch?: boolean;
  _exactDescMatch?: boolean;
}
