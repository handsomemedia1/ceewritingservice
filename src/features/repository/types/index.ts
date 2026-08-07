export interface RepositoryAuthor {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  institution?: string;
  avatar_url?: string;
  orcid?: string;
}

export interface RepositoryPaper {
  id: string;
  title: string;
  slug: string;
  abstract: string;
  
  discipline: string;
  paper_type: string;
  publication_date: string;
  language: string;
  keywords?: string[];
  subject_areas?: string[];
  
  doi?: string;
  isbn?: string;
  license?: string;
  
  institution?: string;
  supervisor?: string;
  funding_info?: string;
  
  pdf_url?: string;
  version_string: string;
  status: 'pending' | 'published' | 'rejected';
  
  views_count: number;
  downloads_count: number;
  
  // Joined relation
  authors?: RepositoryAuthor[];
}
